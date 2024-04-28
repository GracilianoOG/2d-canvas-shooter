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
  mainCanvas = new Canvas(
    window.innerWidth, 
    window.innerHeight, 
    document.querySelector("#game-container")
  );
  
  CANVAS_WIDTH = this.mainCanvas.canvas.width;
  CANVAS_HEIGHT = this.mainCanvas.canvas.height;

  ctx = this.mainCanvas.context;
  
  // Player
  player = new Player(this.CANVAS_WIDTH/2, this.CANVAS_HEIGHT/2, 15, 6, "#fff");
  
  // Scoreboard
  scoreboard = new Scoreboard(8, document.querySelector("#game-container"));
  
  // GameState
  gameAudio = new GameAudio(audios);
  gameState = new GameState({ 
    mainCanvas: this.mainCanvas, 
    player: this.player, 
    gameAudio: this.gameAudio, 
    scoreboard: this.scoreboard 
  });
  
  // Controllers
  enemyCreator = new EnemyCreator(this.gameState.objects);
  playerControl = new PlayerControl(this.gameState.objects);
  gameControl = new GameControl(this.gameState.objects);

  animate = () => {
    requestAnimationFrame(this.animate);
    this.updateCanvas();
    this.updateObjects();
  }

  updateCanvas = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, .4)";
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  updateObjects = () => {
    this.playerControl.update();
    this.gameState.updateObjects(this.gameState.objects.enemies);
    this.gameState.updateObjects(this.gameState.objects.particles);
    this.gameState.updateObjects(this.gameState.objects.bullets);
    this.gameControl.update();
  }

  init = () => {
    this.enemyCreator.startEnemySpawn(.4);
    this.gameAudio.playMusic("battle");
    this.animate();
  }
}

export { Game };