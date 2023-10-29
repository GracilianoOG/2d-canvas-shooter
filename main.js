import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { BulletControl } from "./src/modules/BulletControl.js";
import { EnemyControl } from "./src/modules/EnemyControl.js";
import { Collision } from "./src/modules/Collision.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const bulletControl = new BulletControl(scene);
const player = new Player(50, 50, 30, 30, 6, "white");
const playerControl = new PlayerControl(player, scene, bulletControl);
const enemyControl = new EnemyControl(player, scene);

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  bulletControl.update();
  playerControl.update();
  enemyControl.update();
  Collision.manageCollision(enemyControl, bulletControl);
}

enemyControl.startEnemySpawn(.4);

setTimeout(() => enemyControl.stopEnemySpawn(), 6000);

animate();