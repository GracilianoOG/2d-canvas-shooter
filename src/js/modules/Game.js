import { PlayerControl } from "./PlayerControl.js";
import { Player } from "./Player.js";
import { Canvas } from "./Canvas.js";
import { GameState } from "./GameState.js";
import { EnemyCreator } from "./EnemyCreator.js";
import { GameControl } from "./GameControl.js";
import { GameAudio } from "./GameAudio.js";
import audios from "./audios.js";
import { Scoreboard } from "./Scoreboard.js";
import { CSS_CLASSES, CSS_IDS, STORAGE, COLORS } from "../utils/constants.js";

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
  
  canvasWidth = this.mainCanvas.canvas.width;
  canvasHeight = this.mainCanvas.canvas.height;

  ctx = this.mainCanvas.context;

  constructor() {
    const hs = document.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
    hs.textContent = (localStorage.getItem(STORAGE.KEY_POINTS) || "").padStart(8, "0");

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

      this.canvasWidth = this.mainCanvas.canvas.width;
      this.canvasHeight = this.mainCanvas.canvas.height;
    });
  }

  animate = () => {
    this.animation.id = requestAnimationFrame(this.animate);
    this.updateCanvas();
    this.updateObjects();
  }

  updateCanvas() {
    this.ctx.fillStyle = COLORS.TRANSPARENT_BLACK;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  updateObjects() {
    this.playerControl.update();
    this.gameState.updateObjects(this.gameState.objects.enemies);
    this.gameState.updateObjects(this.gameState.objects.particles);
    this.gameState.updateObjects(this.gameState.objects.bullets);
    this.gameControl.update();
  }

  init() {
    // Player
    this.player = new Player(this.canvasWidth/2, this.canvasHeight/2, 15, 6, COLORS.WHITE);

    // Scoreboard
    this.scoreboard = new Scoreboard(8, document.querySelector(CSS_IDS.CONTAINER));

    // GameState
    this.gameAudio = new GameAudio(audios);
    this.gameState = new GameState({ 
      mainCanvas: this.mainCanvas, 
      player: this.player, 
      gameAudio: this.gameAudio, 
      scoreboard: this.scoreboard,
      screens: this.screens,
      animation: this.animation
    });

    // Controllers
    this.enemyCreator = new EnemyCreator(this.gameState.objects);
    this.playerControl = new PlayerControl(this.gameState.objects);
    this.gameControl = new GameControl(this.gameState.objects);

    // General & Animation
    this.enemyCreator.startEnemySpawn(5.4);
    this.gameAudio.playMusic("battle");
    this.animate();
  }

  restart() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.scoreboard.score = 0;
    this.player.x = this.canvasWidth/2;
    this.player.y = this.canvasHeight/2;
    this.player.isDead = false;
    this.enemyCreator.restartEnemySpawn();
    this.animate();
  }
}

export { Game };