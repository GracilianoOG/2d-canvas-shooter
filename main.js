import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { Canvas } from "./src/modules/Canvas.js";
import { GameState } from "./src/modules/GameState.js";
import { EnemyCreator } from "./src/modules/EnemyCreator.js";
import { GameControl } from "./src/modules/GameControl.js";

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
const playerControl = new PlayerControl(gameState.objects);
const enemyCreator = new EnemyCreator(gameState.objects);
const gameControl = new GameControl(gameState.objects);

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
  gameState.updateObjects(gameState.objects.bullets);
  gameState.updateObjects(gameState.objects.enemies);
  gameState.updateObjects(gameState.objects.particles);
  gameControl.update();
}

const cleanUpObjects = () => {
  GameState.destroyObjects(gameState.objects.bullets);
  GameState.destroyObjects(gameState.objects.enemies);
  GameState.destroyObjects(gameState.objects.particles);
}

const init = () => {
  enemyCreator.startEnemySpawn(.4);
  animate();
}

init();