import { Player } from "../player/Player";
import { Canvas } from "../Canvas";
import { gameState } from "../singletons/GameState";
import { EnemyCreator } from "../enemy/EnemyCreator";
import { GameAudio } from "../audio/GameAudio";
import { Scoreboard } from "../score/Scoreboard";
import * as Screens from "../utils/screens";
import { Timer } from "../Timer";
import { Entity } from "../Entity";
import { FuryMeter } from "../FuryMeter";
import { TRANSPARENT_BLACK, WHITE } from "../utils/constants/colors";
import * as States from "../utils/constants/gameStates";
import { eventManager } from "../singletons/EventManager";
import { LivesDisplay } from "../LivesDisplay";
import { GameLoop } from "./GameLoop";

class Game {
  constructor({ width, height }) {
    this.enemyCreator = new EnemyCreator();
    this.audioManager = new GameAudio();
    this.mainCanvas = new Canvas(width, height);

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
    Entity.updateAll(this.mainCanvas.context, delta * 0.001);
    Timer.updateAll(delta);
    gameState.checkCollisions();
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
    this.mainCanvas.context.fillStyle = TRANSPARENT_BLACK;
    this.mainCanvas.context.fillRect(0, 0, mWidth, mHeight);
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
    this.#resizeCanvas();
    this.audioManager.playMusic("battle");

    document.addEventListener("keydown", (e) => {
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
    window.addEventListener("resize", this.#resizeCanvas.bind(this));
  }

  #resizeCanvas() {
    Canvas.resize(this.realCanvas, this.mainCanvas);
  }
}

export { Game };
