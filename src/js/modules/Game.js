import { Player } from "./Player.js";
import { Canvas } from "./Canvas.js";
import { GameState } from "./GameState.js";
import { EnemyCreator } from "./EnemyCreator.js";
import { GameManager } from "./GameManager.js";
import { GameAudio } from "./GameAudio.js";
import { Scoreboard } from "./Scoreboard.js";
import { CSS_CLASSES, CSS_IDS, COLORS } from "../utils/constants.js";

class Game {
  constructor() {
    this.animation = {};

    this.screens = {
      restart: document.querySelector(CSS_CLASSES.GAME_OVER),
    };

    this.mainCanvas = new Canvas(window.innerWidth, window.innerHeight);
    this.trailsCanvas = new Canvas(window.innerWidth, window.innerHeight);

    this.realCanvas = new Canvas(
      window.innerWidth,
      window.innerHeight,
      document.querySelector(CSS_IDS.CONTAINER)
    );

    this.screens.restart.lastElementChild.addEventListener("click", e => {
      e.stopPropagation();
      this.screens.restart.classList.add("hide");
      this.restart();
    });

    window.addEventListener("resize", () => {
      this.realCanvas.canvas.width = window.innerWidth;
      this.realCanvas.canvas.height = window.innerHeight;
    });
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
      this.realCanvas.canvas.width,
      this.realCanvas.canvas.height
    );

    // Draw buffer canvas on real canvas (all game objects)
    this.realCanvas.context.drawImage(
      this.mainCanvas.canvas,
      0,
      0,
      this.realCanvas.canvas.width,
      this.realCanvas.canvas.height
    );

    // Clear buffer canvas so it won't draw a messed up image next frame
    this.mainCanvas.context.clearRect(
      0,
      0,
      this.mainCanvas.canvas.width,
      this.mainCanvas.canvas.height
    );
  }

  init() {
    // GameState
    window.gameState = new GameState({
      mainCanvas: this.mainCanvas,
      realCanvas: this.realCanvas,
      player: new Player(
        this.mainCanvas.width / 2,
        this.mainCanvas.height / 2,
        15,
        6,
        COLORS.WHITE
      ),
      gameAudio: new GameAudio(),
      scoreboard: new Scoreboard(document.querySelector(CSS_IDS.CONTAINER)),
      screens: this.screens,
      animation: this.animation,
    });

    // Controllers
    this.enemyCreator = new EnemyCreator();
    this.gameManager = new GameManager();

    // General & Animation
    this.enemyCreator.startEnemySpawn(1000.4);
    window.gameState["entities"].gameAudio.playMusic("battle");
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
  }
}

export { Game };
