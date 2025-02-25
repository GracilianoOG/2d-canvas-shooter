import { Player } from "../player/Player.js";
import { Canvas } from "../Canvas.js";
import { GameState } from "../singletons/GameState.js";
import { EnemyCreator } from "../enemy/EnemyCreator.js";
import { GameManager } from "./GameManager.js";
import { GameAudio } from "../audio/GameAudio.js";
import { Scoreboard } from "../score/Scoreboard.js";
import { CSS_CLASSES, CSS_IDS, COLORS } from "../utils/constants.js";

class Game {
  constructor() {
    this.animation = {};
    this.isRunning = true;

    this.screens = {
      restart: document.querySelector(CSS_CLASSES.GAME_OVER),
    };

    this.mainCanvas = new Canvas(800, 600);
    this.trailsCanvas = new Canvas(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    this.realCanvas = new Canvas(
      this.mainCanvas.width,
      this.mainCanvas.height,
      document.querySelector(CSS_IDS.CONTAINER)
    );

    this.screens.restart.lastElementChild.addEventListener("click", e => {
      e.stopPropagation();
      this.screens.restart.classList.add("hide");
      this.restart();
    });

    window.addEventListener("resize", () =>
      Canvas.resizeCanvas(this.realCanvas, this.mainCanvas)
    );
  }

  pause() {
    if (this.isRunning) {
      cancelAnimationFrame(this.animation.id);
      this.enemyCreator.stopEnemySpawn();
    } else {
      this.animation.id = requestAnimationFrame(this.animate);
      this.enemyCreator.restartEnemySpawn();
    }

    this.isRunning = !this.isRunning;
    window.gameState["entities"].isRunning = this.isRunning;
    document.querySelector(".pause-screen").classList.toggle("hide");
  }

  animate = () => {
    this.updateCanvas();
    // Draw background
    this.mainCanvas.context.drawImage(this.trailsCanvas.canvas, 0, 0);

    // Draw objects
    this.gameManager.update();
    this.animation.id = requestAnimationFrame(this.animate);
  };

  updateCanvas() {
    // Create trail effect
    this.trailsCanvas.context.drawImage(this.mainCanvas.canvas, 0, 0);
    this.trailsCanvas.context.fillStyle = COLORS.TRANSPARENT_BLACK;
    this.trailsCanvas.context.fillRect(
      0,
      0,
      this.trailsCanvas.width,
      this.trailsCanvas.height
    );

    // Clear real canvas
    this.realCanvas.context.clearRect(
      0,
      0,
      this.realCanvas.width,
      this.realCanvas.height
    );

    // Draw buffer canvas on real canvas (all game objects)
    this.realCanvas.context.drawImage(
      this.mainCanvas.canvas,
      0,
      0,
      this.realCanvas.width,
      this.realCanvas.height
    );

    // Clear buffer canvas so it won't draw a messed up image next frame
    this.mainCanvas.context.clearRect(
      0,
      0,
      this.mainCanvas.width,
      this.mainCanvas.height
    );
  }

  init() {
    // GameState
    const player = new Player(
      this.mainCanvas.width / 2,
      this.mainCanvas.height / 2,
      15,
      6,
      COLORS.WHITE
    );
    window.gameState = new GameState({
      mainCanvas: this.mainCanvas,
      realCanvas: this.realCanvas,
      player: player,
      gameAudio: new GameAudio(),
      scoreboard: new Scoreboard(document.querySelector(CSS_IDS.CONTAINER)),
      screens: this.screens,
      animation: this.animation,
      isRunning: this.isRunning,
    });

    // Controllers
    this.enemyCreator = new EnemyCreator();
    this.gameManager = new GameManager();

    // General & Animation
    Canvas.resizeCanvas(this.realCanvas, this.mainCanvas);
    this.enemyCreator.startEnemySpawn(0.8);
    window.gameState["entities"].gameAudio.playMusic("battle");
    document.addEventListener("keydown", e => e.key === "p" && this.pause());
    this.animation.id = requestAnimationFrame(this.animate);
  }

  restart() {
    this.mainCanvas.context.clearRect(
      0,
      0,
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    window.gameState["entities"].scoreboard.score = 0;
    window.gameState["entities"].player.x = this.mainCanvas.width / 2;
    window.gameState["entities"].player.y = this.mainCanvas.height / 2;
    window.gameState["entities"].player.isDead = false;
    this.enemyCreator.restartEnemySpawn();
    this.animation.id = requestAnimationFrame(this.animate);
    if (!this.isRunning) {
      console.log("Not running");
    }
  }
}

export { Game };
