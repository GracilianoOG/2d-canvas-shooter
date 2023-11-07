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
const playerRadius = 15;
const player = new Player(
  canvas.width/2 - playerRadius, 
  canvas.height/2 - playerRadius, 
  playerRadius, 6, "#fff"
);

// GameState
const gameState = new GameState(canvas, player);

// Controllers
const bulletControl = new BulletControl(gameState.gameObjects);
const playerControl = new PlayerControl(gameState.gameObjects);
const enemyControl = new EnemyControl(gameState.gameObjects);
const particleControl = new ParticleControl(gameState.gameObjects);

// Animation
const animate = () => {
  requestAnimationFrame(animate);
  updateCanvas();
  updateObjects();
  cleanUpObjects();
}

const updateCanvas = () => {
  ctx.fillStyle = "rgba(0, 0, 0, .4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const updateObjects = () => {
  playerControl.update();
  bulletControl.update();
  enemyControl.update();
  particleControl.update();
}

const cleanUpObjects = () => {
  gameState.destroyObjects(gameState.gameObjects.bullets);
  gameState.destroyObjects(gameState.gameObjects.enemies);
  gameState.destroyObjects(gameState.gameObjects.particles);
}

const init = () => {
  enemyControl.startEnemySpawn(.4);
  animate();
}

init();