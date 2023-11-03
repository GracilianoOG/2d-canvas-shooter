import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { BulletControl } from "./src/modules/BulletControl.js";
import { EnemyControl } from "./src/modules/EnemyControl.js";
import { Canvas } from "./src/modules/Canvas.js";
import { GameState } from "./src/modules/GameState.js";
import { ParticleControl } from "./src/modules/ParticleControl.js";

// Canvas
const canvasObj = new Canvas(
  window.innerWidth, 
  window.innerHeight, 
  document.querySelector("#game-container")
);
const { canvas, context: ctx } = canvasObj;

// Player
const playerSize = 30;
const player = new Player(
  canvas.width/2 - playerSize/2, 
  canvas.height/2 - playerSize/2, 
  playerSize, playerSize, 6, "white"
);

// GameState
const gameState = new GameState(canvas, player);

// Controllers
const bulletControl = new BulletControl(gameState);
const playerControl = new PlayerControl(gameState);
const enemyControl = new EnemyControl(gameState);
const particleControl = new ParticleControl(gameState);

// Animation
const animate = () => {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, .4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletControl.update();
  playerControl.update();
  enemyControl.update();
  particleControl.update();
}

enemyControl.startEnemySpawn(.4);

animate();