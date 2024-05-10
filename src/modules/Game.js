import { PlayerControl } from "./PlayerControl.js";
import { Player } from "./Player.js";
import { Canvas } from "./Canvas.js";
import { GameState } from "./GameState.js";
import { EnemyCreator } from "./EnemyCreator.js";
import { GameControl } from "./GameControl.js";
import { GameAudio } from "./GameAudio.js";
import audios from "./audios.js";
import { Scoreboard } from "./Scoreboard.js";

class Game {
  animation = {};

  screens = {
    start: document.querySelector(".game-start"),
    restart: document.querySelector(".game-restart")
  };

  mainCanvas = new Canvas(
    window.innerWidth, 
    window.innerHeight, 
    document.querySelector("#game-container")
  );
  
  CANVAS_WIDTH = this.mainCanvas.canvas.width;
  CANVAS_HEIGHT = this.mainCanvas.canvas.height;

  ctx = this.mainCanvas.context;

  constructor() {
    this.screens.start.addEventListener("click", (e) => {
      e.stopPropagation();
      this.screens.start.style.display = "none";
      this.init();
    }, { once: true });

    this.screens.restart.lastElementChild.addEventListener("click", () => {
      this.screens.restart.style.display = "none";
      this.restart();
    });
  }

  animate = () => {
    this.animation.id = requestAnimationFrame(this.animate);
    this.updateCanvas();
    this.updateObjects();
  }

  updateCanvas() {
    this.ctx.fillStyle = "rgba(0, 0, 0, .4)";
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
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
    this.player = new Player(this.CANVAS_WIDTH/2, this.CANVAS_HEIGHT/2, 15, 6, "#fff");

    // Scoreboard
    this.scoreboard = new Scoreboard(8, document.querySelector("#game-container"));

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
    this.enemyCreator.startEnemySpawn(.4);
    this.gameAudio.playMusic("battle");
    this.animate();
  }

  restart() {
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.scoreboard.score = 0;
    this.player.x = this.CANVAS_WIDTH/2;
    this.player.y = this.CANVAS_HEIGHT/2;
    this.player.isDead = false;
    this.enemyCreator.restartEnemySpawn();
    this.animate();
  }
}

export { Game };