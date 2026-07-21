import { Player } from "../entities/Player";
import { GameCanvas } from "../../engine/core/GameCanvas";
import { gameState } from "./GameState";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { Scoreboard } from "../ui/Scoreboard";
import * as Screens from "../utils/screens";
import { Timer } from "../../engine/systems/Timer";
import { FuryMeter } from "../ui/FuryMeter";
import { TRANSPARENT_BLACK, WHITE } from "../utils/constants/colors";
import * as States from "../../engine/constants/gameStates";
import { eventManager } from "../../engine/systems/EventManager";
import { LivesDisplay } from "../ui/LivesDisplay";
import { Engine } from "../../engine/core/Engine";
import { audioSystem } from "../../engine/systems/AudioSystem";
import { entityManager } from "../systems/EntityManager";
import { collisionManager } from "../systems/CollisionManager";
import { scoreManager } from "../systems/ScoreManager";
import audios from "@/data/audios";
import { inputManager } from "../../engine/systems/InputManager";

class Game {
  constructor({ width, height }) {
    this.enemyCreator = new EnemyCreator();
    this.audioManager = audioSystem;
    this.mainCanvas = new GameCanvas(width, height, Screens.game);
    this.settings = {
      trails: true,
    };

    this.gameLoop = new Engine(this.update.bind(this), this.render.bind(this), {
      ctx: this.mainCanvas.ctx,
    });

    this.#listenToWindowChange();
    this.#listenToResize();

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
  }

  get shaker() {
    return this.gameLoop.shaker;
  }

  get state() {
    return this.gameLoop.state;
  }

  set state(state) {
    this.gameLoop.state = state;
  }

  startLoop() {
    this.gameLoop.start();
  }

  stopLoop(state) {
    this.gameLoop.stop(state);
  }

  pause() {
    if (this.state === States.GAMEOVER || this.state === States.NOT_RUNNING) {
      return;
    } else if (this.state === States.RUNNING) {
      this.stopLoop(States.PAUSED);
    } else {
      this.startLoop();
    }

    const indicators = document.querySelectorAll(".score");
    indicators.forEach(
      (i) => (i.style.animationPlayState = this.state.toLowerCase()),
    );

    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.shaker.start(strength, duration);
  }

  update(delta) {
    entityManager.renderAll(this.mainCanvas.ctx, delta * 0.001);
    collisionManager.checkCollisions();
    Timer.updateAll(delta);
  }

  render() {
    const { width, height } = this.mainCanvas.canvasSize;
    this.mainCanvas.render();

    if (this.settings.trails) {
      this.mainCanvas.ctx.fillStyle = TRANSPARENT_BLACK;
      this.mainCanvas.ctx.fillRect(0, 0, width, height);
    } else {
      this.mainCanvas.ctx.clearRect(0, 0, width, height);
    }
  }

  async loadAssets() {
    await this.audioManager.load("hit", audios.hit[0]);
    await this.audioManager.load("explosion", audios.explosion[0]);
    await this.audioManager.load("shot", audios.shot[0]);
    await this.audioManager.load("battle", audios.battle[0]);
  }

  async init() {
    // GameState
    const { width: mWidth, height: mHeight } = this.mainCanvas.canvasSize;
    const player = new Player(mWidth / 2, mHeight / 2, 15, 375, WHITE);
    const hud = document.querySelector("#hud");
    const scoreboard = new Scoreboard(hud);
    const furyMeter = new FuryMeter({
      container: hud,
      label: "fury",
      value: 100,
    });
    const livesDisplay = new LivesDisplay(hud);
    livesDisplay.showCurrentLives(player.lives);
    entityManager.add(player);

    await this.loadAssets();

    gameState.addEntities({
      mainCanvas: this.mainCanvas,
      player,
      gameAudio: this.audioManager,
      scoreboard,
      furyMeter,
      game: this,
    });

    Screens.loading.remove();
    Screens.start.classList.remove("hide");
    inputManager.init(Screens.game);
  }

  start() {
    this.#resizeCanvas();
    this.audioManager.playMusic("battle");
    this.enemyCreator.start();
    this.startLoop();

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyP") this.pause();
    });
  }

  restart() {
    const { width: mWidth, height: mHeight } = this.mainCanvas.canvasSize;
    const player = gameState.getEntity("player");
    this.mainCanvas.ctx.clearRect(0, 0, mWidth, mHeight);
    gameState.getEntity("furyMeter").value = 0;
    player.revive(mWidth / 2, mHeight / 2);
    this.enemyCreator.reset();
    entityManager.clear([player]);
    scoreManager.reset();
    this.startLoop();
  }

  #onPlayerDeath() {
    this.state = States.GAMEOVER;
    this.enemyCreator.stop();
  }

  #listenToWindowChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === States.RUNNING) this.pause();
    });
  }

  #listenToResize() {
    window.addEventListener("resize", this.#resizeCanvas.bind(this));
  }

  #resizeCanvas() {
    this.mainCanvas.resize();
  }
}

export { Game };
