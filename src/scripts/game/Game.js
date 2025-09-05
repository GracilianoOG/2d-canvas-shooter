import { Player } from "../player/Player.js";
import { Canvas } from "../Canvas.js";
import { gameState } from "../singletons/GameState.js";
import { EnemyCreator } from "../enemy/EnemyCreator.js";
import { GameAudio } from "../audio/GameAudio.js";
import { Scoreboard } from "../score/Scoreboard.js";
import * as Screens from "../utils/screens.js";
import { Timer } from "../Timer.js";
import { Entity } from "../Entity.js";
import { FuryMeter } from "../FuryMeter.js";
import { TRANSPARENT_BLACK, WHITE } from "../utils/constants/colors.js";
import * as States from "../utils/constants/gameStates.js";
import { eventManager } from "../singletons/EventManager.js";
import { LivesDisplay } from "../LivesDisplay.js";
import { GameLoop } from "./GameLoop.js";

class Game {
  constructor(configs) {
    this.enemyCreator = new EnemyCreator();
    this.audioManager = new GameAudio();
    this.mainCanvas = new Canvas(configs.width, configs.height);

    this.gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this),
      { FPS: configs.FPS ?? 60, ctx: this.mainCanvas.context }
    );

    const { width: mWidth, height: mHeight } = this.mainCanvas;
    this.trailsCanvas = new Canvas(mWidth, mHeight);
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
    }

    if (this.state === States.RUNNING) {
      this.stopLoop(States.PAUSED);
    } else {
      this.startLoop();
    }

    const indicators = document.querySelectorAll(".score");
    indicators.forEach(
      i => (i.style.animationPlayState = this.state.toLowerCase())
    );

    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.shaker.start(strength, duration);
  }

  update(delta) {
    Entity.updateAll(this.mainCanvas.context, delta * 0.001);
    Timer.updateAll(delta);
    gameState.checkCollisions();
  }

  render() {
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    const { width: rWidth, height: rHeight } = this.realCanvas;
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const mCanvas = this.mainCanvas.canvas;

    // Create trail effect
    this.trailsCanvas.context.drawImage(mCanvas, 0, 0);
    this.trailsCanvas.context.fillStyle = TRANSPARENT_BLACK;
    this.trailsCanvas.context.fillRect(0, 0, tWidth, tHeight);

    // Clear real canvas
    this.realCanvas.context.clearRect(0, 0, rWidth, rHeight);

    // Draw buffer canvas on real canvas (all game objects)
    this.realCanvas.context.drawImage(mCanvas, 0, 0, rWidth, rHeight);

    // Clear buffer canvas so it won't draw a messed up image next frame
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);

    // Draw background
    this.mainCanvas.context.drawImage(this.trailsCanvas.canvas, 0, 0);
  }

  init() {
    // GameState
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const player = new Player(mWidth / 2, mHeight / 2, 15, 375, WHITE);
    const hud = document.querySelector("#hud");
    const scoreboard = new Scoreboard(hud);
    const furyMeter = new FuryMeter(hud);
    const livesDisplay = new LivesDisplay(hud);
    livesDisplay.showCurrentLives(player.lives);

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

    // General & Animation
    Canvas.resizeCanvas(this.realCanvas, this.mainCanvas);
    this.audioManager.playMusic("battle");

    document.addEventListener("keydown", e => {
      if (e.code === "KeyP") this.pause();
    });

    this.enemyCreator.start();
    this.startLoop();
  }

  restart() {
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    const player = gameState.getEntity("player");
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);
    this.trailsCanvas.context.clearRect(0, 0, tWidth, tHeight);
    gameState.getEntity("scoreboard").reset();
    gameState.getEntity("furyMeter").empty();
    player.revive(mWidth / 2, mHeight / 2);
    this.enemyCreator.reset();
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
    window.addEventListener("resize", () =>
      Canvas.resizeCanvas(this.realCanvas, this.mainCanvas)
    );
  }
}

export { Game };
