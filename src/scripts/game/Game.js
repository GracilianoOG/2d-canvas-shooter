import { Player } from "../player/Player.js";
import { Canvas } from "../Canvas.js";
import { gameState } from "../singletons/GameState.js";
import { EnemyCreator } from "../enemy/EnemyCreator.js";
import { GameAudio } from "../audio/GameAudio.js";
import { Scoreboard } from "../score/Scoreboard.js";
import { COLORS } from "../utils/constants.js";
import * as Screens from "../utils/screens.js";
import { Timer } from "../Timer.js";
import { randomInt } from "../utils/utility.js";
import { Entity } from "../Entity.js";

class Game {
  constructor(configs) {
    this.rafId = null;
    this.lastTime = null;
    this.deltaTime = null;
    this.isRunning = false;
    this.shake = { strength: 0, timer: null };
    this.enemyCreator = new EnemyCreator(800);
    this.audioManager = new GameAudio();

    this.mainCanvas = new Canvas(configs.width, configs.height);
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    this.trailsCanvas = new Canvas(mWidth, mHeight);
    this.realCanvas = new Canvas(mWidth, mHeight, Screens.game);
  }

  loop() {
    this.isRunning = true;
    this.rafId = requestAnimationFrame(this.animate);
  }

  stopLoop() {
    this.isRunning = false;
    this.lastTime = 0;
    cancelAnimationFrame(this.rafId);
  }

  pause() {
    if (gameState.getEntity("player").isDead) return;
    this.isRunning ? this.stopLoop() : this.loop();
    const indicators = document.querySelectorAll(".score");
    const state = this.isRunning ? "running" : "paused";
    indicators.forEach(i => (i.style.animationPlayState = state));
    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.shake.strength = strength;
    if (!this.shake.timer)
      this.shake.timer = new Timer(duration, { loop: false });
    this.shake.timer.reset(duration);
  }

  animate = timestamp => {
    this.deltaTime = timestamp - (this.lastTime ?? timestamp);
    this.lastTime = timestamp;

    if (this.shake.timer?.active) {
      const strength = this.shake.strength;
      const xOffset = randomInt(-strength, strength);
      const yOffset = randomInt(-strength, strength);
      this.mainCanvas.context.translate(xOffset, yOffset);
    }
    this.update();
    this.mainCanvas.context.setTransform(1, 0, 0, 1, 0, 0);
    this.render();
    this.loop();
  };

  update() {
    Entity.updateAll(this.mainCanvas.context);
    Timer.updateAll(this.deltaTime);
    gameState.checkCollisions();
  }

  render() {
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    const { width: rWidth, height: rHeight } = this.realCanvas;
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const mCanvas = this.mainCanvas.canvas;

    // Create trail effect
    this.trailsCanvas.context.drawImage(mCanvas, 0, 0);
    this.trailsCanvas.context.fillStyle = COLORS.TRANSPARENT_BLACK;
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
    const player = new Player(mWidth / 2, mHeight / 2, 15, 6, COLORS.WHITE);
    const scoreboard = new Scoreboard();
    gameState.addEntities({
      mainCanvas: this.mainCanvas,
      realCanvas: this.realCanvas,
      player,
      gameAudio: this.audioManager,
      scoreboard,
      game: this,
    });

    // General & Animation
    Canvas.resizeCanvas(this.realCanvas, this.mainCanvas);
    this.audioManager.playMusic("battle");

    document.addEventListener("keydown", e => {
      if (e.code === "KeyP") this.pause();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.isRunning) this.pause();
    });

    this.enemyCreator.start();
    this.loop();
  }

  restart() {
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);
    this.trailsCanvas.context.clearRect(0, 0, tWidth, tHeight);
    gameState.getEntity("scoreboard").score = 0;
    gameState.getEntity("player").revive(mWidth / 2, mHeight / 2);
    this.enemyCreator.reset();
    this.loop();
  }
}

export { Game };
