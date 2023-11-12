import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { Canvas } from "./src/modules/Canvas.js";
import { GameState } from "./src/modules/GameState.js";
import { EnemyCreator } from "./src/modules/EnemyCreator.js";
import { GameControl } from "./src/modules/GameControl.js";
import { GameAudio } from "./src/modules/GameAudio.js";
import audios from "./src/modules/audios.js";
import { Scoreboard } from "./src/modules/Scoreboard.js";

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

// Scoreboard
const scoreboard = new Scoreboard(8, document.querySelector("#game-container"));

// GameState
const gameAudio = new GameAudio(audios);
const gameState = new GameState(canvas, player, gameAudio, scoreboard);

// Controllers
const enemyCreator = new EnemyCreator(gameState.objects);
const playerControl = new PlayerControl(gameState.objects);
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