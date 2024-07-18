import { PlayerControl } from "./PlayerControl.js";
import { Player } from "./Player.js";
import { Canvas } from "./Canvas.js";
import { GameState } from "./GameState.js";
import { EnemyCreator } from "./EnemyCreator.js";
import { GameControl } from "./GameControl.js";
import { GameAudio } from "./GameAudio.js";
import audios from "./audios.js";
import { Scoreboard } from "./Scoreboard.js";
import { CSS_CLASSES, CSS_IDS, COLORS } from "../utils/constants.js";
import { getHighscore } from "../utils/helpers.js";

class Game {
  animation = {};

  screens = {
    start: document.querySelector(CSS_CLASSES.GAME_START),
    restart: document.querySelector(CSS_CLASSES.GAME_OVER)
  };

  mainCanvas = new Canvas(
    window.innerWidth, 
    window.innerHeight, 
    document.querySelector(CSS_IDS.CONTAINER)
  );

  ctx = this.mainCanvas.context;

  constructor() {
    const hs = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
    hs.textContent = getHighscore();

    this.screens.start.addEventListener("click", (e) => {
      e.stopPropagation();
      this.screens.start.style.display = "none";
      this.init();
    }, { once: true });

    this.screens.restart.lastElementChild.addEventListener("click", (e) => {
      e.stopPropagation();
      this.screens.restart.style.display = "none";
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
    this.updateObjects();
  }

  updateCanvas() {
    this.ctx.fillStyle = COLORS.TRANSPARENT_BLACK;
    this.ctx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
  }

  updateObjects() {
    this.playerControl.update();
    this.updateEntities(this.gameState.entities.enemies);
    this.updateEntities(this.gameState.entities.particles);
    this.updateEntities(this.gameState.entities.bullets);
    this.gameControl.update();
  }

  updateEntities(entities) {
    for(let i = entities.length - 1; i >= 0; i--) {
      const elem = entities[i];
      elem.update(this.ctx);
      elem.toDestroy && entities.splice(i, 1);
    }
  }

  init() {
    // GameState
    this.gameState = new GameState({ 
      mainCanvas: this.mainCanvas, 
      player: new Player(this.mainCanvas.width/2, this.mainCanvas.height/2, 15, 6, COLORS.WHITE), 
      gameAudio: new GameAudio(audios), 
      scoreboard: new Scoreboard(8, document.querySelector(CSS_IDS.CONTAINER)),
      screens: this.screens,
      animation: this.animation
    });

    // Controllers
    this.enemyCreator = new EnemyCreator(this.gameState.entities);
    this.playerControl = new PlayerControl(this.gameState.entities);
    this.gameControl = new GameControl(this.gameState.entities);

    // General & Animation
    this.enemyCreator.startEnemySpawn(0.4);
    this.gameState.entities.gameAudio.playMusic("battle");
    this.animate();
  }

  restart() {
    this.ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.gameState.entities.scoreboard.score = 0;
    this.gameState.entities.player.x = this.mainCanvas.width/2;
    this.gameState.entities.player.y = this.mainCanvas.height/2;
    this.gameState.entities.player.isDead = false;
    this.gameState.entities.enemyCreator.restartEnemySpawn();
    this.animate();
  }
}

export { Game };