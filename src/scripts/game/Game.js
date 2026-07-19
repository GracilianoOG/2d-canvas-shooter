import { Player } from "../player/Player";
import { Canvas } from "../Canvas";
import { gameState } from "../singletons/GameState";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { Scoreboard } from "../ui/Scoreboard";
import * as Screens from "../utils/screens";
import { Timer } from "../Timer";
import { FuryMeter } from "../ui/FuryMeter";
import { TRANSPARENT_BLACK, WHITE } from "../utils/constants/colors";
import * as States from "../utils/constants/gameStates";
import { eventManager } from "../singletons/EventManager";
import { LivesDisplay } from "../ui/LivesDisplay";
import { GameLoop } from "./GameLoop";
import { AudioSystem } from "../audio/AudioSystem";
import { entityManager } from "../systems/EntityManager";
import { collisionManager } from "../systems/CollisionManager";
import { scoreManager } from "../systems/ScoreManager";

class Game {
  constructor({ width, height }) {
    this.enemyCreator = new EnemyCreator();
    this.audioManager = new AudioSystem();
    this.mainCanvas = new Canvas(width, height);
    this.settings = {
      trails: true,
    };

    this.gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this),
      { ctx: this.mainCanvas.context },
    );

    const { width: mWidth, height: mHeight } = this.mainCanvas;
    this.realCanvas = new Canvas(mWidth, mHeight, Screens.game);

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
    entityManager.renderAll(this.mainCanvas.context, delta * 0.001);
    collisionManager.checkCollisions();
    Timer.updateAll(delta);
  }

  render() {
    const { width: rWidth, height: rHeight } = this.realCanvas;
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const mCanvas = this.mainCanvas.canvas;

    // Clear real canvas
    this.realCanvas.context.clearRect(0, 0, rWidth, rHeight);

    // Draw buffer canvas on real canvas (all game objects)
    this.realCanvas.context.drawImage(mCanvas, 0, 0, rWidth, rHeight);

    // Create trail effect
    if (this.settings.trails) {
      this.mainCanvas.context.fillStyle = TRANSPARENT_BLACK;
      this.mainCanvas.context.fillRect(0, 0, mWidth, mHeight);
    } else {
      this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);
    }
  }

  async init() {
    // GameState
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const player = new Player(mWidth / 2, mHeight / 2, 15, 375, WHITE);
    const hud = document.querySelector("#hud");
    const scoreboard = new Scoreboard(hud);
    const furyMeter = new FuryMeter(hud);
    const livesDisplay = new LivesDisplay(hud);
    livesDisplay.showCurrentLives(player.lives);
    entityManager.add(player);

    await this.audioManager.init();

    gameState.addEntities({
      mainCanvas: this.mainCanvas,
      realCanvas: this.realCanvas,
      player,
      gameAudio: this.audioManager,
      scoreboard,
      furyMeter,
      livesDisplay,
      game: this,
    });

    Screens.loading.remove();
    Screens.start.classList.remove("hide");
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
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const player = gameState.getEntity("player");
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);
    gameState.getEntity("furyMeter").empty();
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
    Canvas.resize(this.realCanvas, this.mainCanvas);
  }
}

export { Game };
