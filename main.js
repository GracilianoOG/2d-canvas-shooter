import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { BulletControl } from "./src/modules/BulletControl.js";
import { Enemy } from "./src/modules/Enemy.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const bulletControl = new BulletControl(scene);
const player = new Player(50, 50, 30, 30, 6, "white");
const playerControl = new PlayerControl(player, scene, bulletControl);
const enemies = [];

const createHorizontalEnemy = (enemySize) => {
  const xPos = Math.floor(Math.random() * scene.width);
  const yPos = Math.random() > .5 ? -enemySize : scene.height + enemySize;
  return [xPos, yPos];
}

const createVerticalEnemy = (enemySize) => {
  const xPos = Math.random() > .5 ? -enemySize : scene.width + enemySize;
  const yPos = Math.floor(Math.random() * scene.height);
  return [xPos, yPos];
}

setInterval(() => {
  const enemySize = 20;
  const coords = Math.random() > .5 ? createVerticalEnemy(enemySize) : createHorizontalEnemy(enemySize);
  enemies.push(new Enemy(coords[0], coords[1], enemySize, 3, "red", player));
}, 2000);

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  bulletControl.update();
  playerControl.update();
  enemies.forEach(enemy => enemy.update(ctx));
}

animate();