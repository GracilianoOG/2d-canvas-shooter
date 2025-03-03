import { Player } from "../player/Player.js";
import { Canvas } from "../Canvas.js";
import { GameState } from "../singletons/GameState.js";
import { EnemyCreator } from "../enemy/EnemyCreator.js";
import { GameManager } from "./GameManager.js";
import { GameAudio } from "../audio/GameAudio.js";
import { Scoreboard } from "../score/Scoreboard.js";
import { COLORS } from "../utils/constants.js";
import * as Screens from "../utils/screens.js";
import { Timer } from "../Timer.js";

class Game {
  constructor() {
    this.animation = {};
    this.isRunning = false;
    this.shake = { isActive: false, strength: 0, duration: 0 };
    this.lastTime = 0;
    this.deltaTime = 0;

    this.mainCanvas = new Canvas(800, 600);
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    this.trailsCanvas = new Canvas(mWidth, mHeight);
    this.realCanvas = new Canvas(mWidth, mHeight, Screens.game);

    Screens.restart.lastElementChild.addEventListener("click", e => {
      e.stopPropagation();
      Screens.restart.classList.add("hide");
      this.restart();
    });

    window.addEventListener("resize", () =>
      Canvas.resizeCanvas(this.realCanvas, this.mainCanvas)
    );
  }

  startLoop() {
    this.isRunning = true;
    window.gameState.entities.isRunning = this.isRunning;
    this.animation.id = requestAnimationFrame(this.animate);
  }

  stopLoop() {
    this.isRunning = false;
    window.gameState.entities.isRunning = this.isRunning;
    cancelAnimationFrame(this.animation.id);
    this.lastTime = 0;
  }

  pause() {
    if (this.isRunning) {
      this.stopLoop();
      this.enemyCreator.stopEnemySpawn();
    } else {
      this.startLoop();
      this.enemyCreator.restartEnemySpawn();
    }

    const indicators = document.querySelectorAll(".score");
    indicators.forEach(
      s => (s.style.animationPlayState = this.isRunning ? "running" : "paused")
    );

    Screens.pause.classList.toggle("hide");
  }

  shakeScreen(strength, duration) {
    this.shake.isActive = true;
    this.shake.strength = strength;
    this.shake.duration = Date.now() + duration;
  }

  animate = timestamp => {
    if (this.lastTime) {
      this.deltaTime = timestamp - this.lastTime;
    }
    this.lastTime = timestamp;

    if (this.shake.isActive && Date.now() < this.shake.duration) {
      const xOffset = Math.random() * this.shake.strength;
      const yOffset = Math.random() * this.shake.strength;
      this.mainCanvas.context.translate(xOffset, yOffset);
    } else {
      this.shake.isActive = false;
    }
    this.gameManager.update();
    this.mainCanvas.context.setTransform(1, 0, 0, 1, 0, 0);
    Timer.updateAll(this.deltaTime);
    this.updateCanvas();
    this.startLoop();
  };

  updateCanvas() {
    // Create trail effect
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    const mCanvas = this.mainCanvas.canvas;
    this.trailsCanvas.context.drawImage(mCanvas, 0, 0);
    this.trailsCanvas.context.fillStyle = COLORS.TRANSPARENT_BLACK;
    this.trailsCanvas.context.fillRect(0, 0, tWidth, tHeight);

    // Clear real canvas
    const { width: rWidth, height: rHeight } = this.realCanvas;
    this.realCanvas.context.clearRect(0, 0, rWidth, rHeight);

    // Draw buffer canvas on real canvas (all game objects)
    this.realCanvas.context.drawImage(mCanvas, 0, 0, rWidth, rHeight);

    // Clear buffer canvas so it won't draw a messed up image next frame
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);

    // Draw background
    this.mainCanvas.context.drawImage(this.trailsCanvas.canvas, 0, 0);
  }

  init() {
    // GameState
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const player = new Player(mWidth / 2, mHeight / 2, 15, 6, COLORS.WHITE);
    window.gameState = new GameState({
      mainCanvas: this.mainCanvas,
      realCanvas: this.realCanvas,
      player: player,
      gameAudio: new GameAudio(),
      scoreboard: new Scoreboard(Screens.game),
      isRunning: this.isRunning,
      game: this,
    });

    // Controllers
    this.enemyCreator = new EnemyCreator();
    this.gameManager = new GameManager();

    // General & Animation
    Canvas.resizeCanvas(this.realCanvas, this.mainCanvas);
    this.enemyCreator.startEnemySpawn(0.8);
    window.gameState.entities.gameAudio.playMusic("battle");

    document.addEventListener("keydown", e => {
      if (e.code === "KeyP" && !window.gameState.entities.player.isDead) {
        this.pause();
      }
    });

    document.addEventListener("visibilitychange", () => {
      const isPlayerAlive = !window.gameState.entities.player.isDead;

      if (document.hidden && this.isRunning && isPlayerAlive) {
        this.pause();
      }
    });

    this.startLoop();
  }

  restart() {
    const { width: mWidth, height: mHeight } = this.mainCanvas;
    const { width: tWidth, height: tHeight } = this.trailsCanvas;
    this.mainCanvas.context.clearRect(0, 0, mWidth, mHeight);
    this.trailsCanvas.context.clearRect(0, 0, tWidth, tHeight);
    window.gameState.entities.scoreboard.score = 0;
    window.gameState.entities.player.revive(mWidth / 2, mHeight / 2);
    this.enemyCreator.restartEnemySpawn();
    this.startLoop();
  }
}

export { Game };
