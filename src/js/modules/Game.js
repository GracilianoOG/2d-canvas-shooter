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

    this.mainCanvas = new Canvas(
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
      this.mainCanvas.canvas.width = window.innerWidth;
      this.mainCanvas.canvas.height = window.innerHeight;
    });
  }

  animate = () => {
    this.animation.id = requestAnimationFrame(this.animate);
    this.updateCanvas();
    window.gameState.entities.player.update();
    this.gameManager.update();
  };

  updateCanvas() {
    this.mainCanvas.context.fillStyle = COLORS.TRANSPARENT_BLACK;
    this.mainCanvas.context.fillRect(
      0,
      0,
      this.mainCanvas.width,
      this.mainCanvas.height
    );
  }

  init() {
    // GameState
    window.gameState = new GameState({
      mainCanvas: this.mainCanvas,
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
    this.enemyCreator.startEnemySpawn(0.4);
    window.gameState["entities"].gameAudio.playMusic("battle");
    this.animate();
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
    this.animate();
  }
}

export { Game };
