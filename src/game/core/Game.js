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
import { Shaker } from "@/engine/systems/Shaker";

class Game {
  #state;
  #engine;
  #audio;
  #canvas;
  #shaker;
  #enemyCreator;
  #settings;

  constructor({ width, height }) {
    this.#enemyCreator = new EnemyCreator();
    this.#audio = audioSystem;
    this.#canvas = new GameCanvas(width, height, Screens.game);
    this.#shaker = new Shaker(this.#canvas.ctx);
    this.#engine = new Engine(this.update.bind(this), this.render.bind(this));
    this.#state = States.NOT_RUNNING;
    this.#settings = {
      trails: true,
    };

    this.#listenToWindowChange();
    this.#listenToResize();

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
  }

  get state() {
    return this.#state;
  }

  startLoop() {
    this.#engine.start();
    this.#state = States.RUNNING;
  }

  stopLoop(state) {
    this.#engine.stop();
    this.#state = state;
  }

  pause() {
    this.#engine.isRunning = !this.#engine.isRunning;
    this.#state = this.#engine.isRunning ? States.RUNNING : States.PAUSED;

    const indicators = document.querySelectorAll(".score");
    indicators.forEach(
      (i) => (i.style.animationPlayState = this.state.toLowerCase()),
    );

    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.#shaker.start(strength, duration);
  }

  update(delta) {
    this.#shaker.shake();
    entityManager.renderAll(this.#canvas.ctx, delta * 0.001);
    this.#shaker.restore();

    collisionManager.checkCollisions();
    Timer.updateAll(delta);
  }

  render() {
    const { width, height } = this.#canvas.canvasSize;
    this.#canvas.render();

    if (this.#settings.trails) {
      this.#canvas.ctx.fillStyle = TRANSPARENT_BLACK;
      this.#canvas.ctx.fillRect(0, 0, width, height);
    } else {
      this.#canvas.ctx.clearRect(0, 0, width, height);
    }
  }

  async loadAssets() {
    await this.#audio.load("hit", audios.hit[0]);
    await this.#audio.load("explosion", audios.explosion[0]);
    await this.#audio.load("shot", audios.shot[0]);
    await this.#audio.load("battle", audios.battle[0]);
  }

  async init() {
    // GameState
    const { width: mWidth, height: mHeight } = this.#canvas.canvasSize;
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
      mainCanvas: this.#canvas,
      player,
      gameAudio: this.#audio,
      scoreboard,
      furyMeter,
      game: this,
    });

    Screens.loading.remove();
    Screens.start.classList.remove("hide");
    inputManager.init(Screens.game);
  }

  start() {
    this.#audio.playMusic("battle");
    this.#enemyCreator.start();
    this.startLoop();

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyP") this.pause();
    });
  }

  restart() {
    const { width: mWidth, height: mHeight } = this.#canvas.canvasSize;
    const player = gameState.getEntity("player");
    this.#canvas.ctx.clearRect(0, 0, mWidth, mHeight);
    gameState.getEntity("furyMeter").value = 0;
    player.revive(mWidth / 2, mHeight / 2);
    this.#enemyCreator.reset();
    entityManager.clear([player]);
    scoreManager.reset();
    this.startLoop();
  }

  #onPlayerDeath() {
    this.#state = States.GAMEOVER;
    this.#enemyCreator.stop();
  }

  #listenToWindowChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === States.RUNNING) this.pause();
    });
  }

  #listenToResize() {
    window.addEventListener("resize", () => this.#canvas.resize());
  }
}

export { Game };
