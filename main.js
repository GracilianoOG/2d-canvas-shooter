import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { BulletControl } from "./src/modules/BulletControl.js";
import { EnemyControl } from "./src/modules/EnemyControl.js";
import { Collision } from "./src/modules/Collision.js";
import { Canvas } from "./src/modules/Canvas.js";

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

// Controllers
const bulletControl = new BulletControl(canvas);
const playerControl = new PlayerControl(player, canvas, bulletControl);
const enemyControl = new EnemyControl(player, canvas);

// Animation
const animate = () => {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, .4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletControl.update();
  playerControl.update();
  enemyControl.update();
  Collision.manageCollision(enemyControl, bulletControl);
}

enemyControl.startEnemySpawn(.4);

animate();