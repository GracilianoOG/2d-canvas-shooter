// import { PlayerControl } from "./src/modules/PlayerControl.js";
// import { Player } from "./src/modules/Player.js";
// import { Canvas } from "./src/modules/Canvas.js";
// import { GameState } from "./src/modules/GameState.js";
// import { EnemyCreator } from "./src/modules/EnemyCreator.js";
// import { GameControl } from "./src/modules/GameControl.js";
// import { GameAudio } from "./src/modules/GameAudio.js";
// import audios from "./src/modules/audios.js";
// import { Scoreboard } from "./src/modules/Scoreboard.js";

// // Canvas
// const mainCanvas = new Canvas(
//   window.innerWidth, 
//   window.innerHeight, 
//   document.querySelector("#game-container")
// );
// const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = mainCanvas.canvas;
// const ctx = mainCanvas.context;

// // Player
// const player = new Player(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 15, 6, "#fff");

// // Scoreboard
// const scoreboard = new Scoreboard(8, document.querySelector("#game-container"));

// // GameState
// const gameAudio = new GameAudio(audios);
// const gameState = new GameState({ mainCanvas, player, gameAudio, scoreboard });

// // Controllers
// const enemyCreator = new EnemyCreator(gameState.objects);
// const playerControl = new PlayerControl(gameState.objects);
// const gameControl = new GameControl(gameState.objects);

// // Animation
// const animate = () => {
//   requestAnimationFrame(animate);
//   updateCanvas();
//   updateObjects();
// }

// const updateCanvas = () => {
//   ctx.fillStyle = "rgba(0, 0, 0, .4)";
//   ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
// }

// const updateObjects = () => {
//   playerControl.update();
//   gameState.updateObjects(gameState.objects.bullets);
//   gameState.updateObjects(gameState.objects.enemies);
//   gameState.updateObjects(gameState.objects.particles);
//   gameControl.update();
// }

// const init = () => {
//   enemyCreator.startEnemySpawn(.4);
//   animate();
// }

// init();

import { Game } from "./src/modules/Game.js";

const game = new Game();
game.init();