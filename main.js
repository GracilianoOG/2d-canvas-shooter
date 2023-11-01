import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { BulletControl } from "./src/modules/BulletControl.js";
import { EnemyControl } from "./src/modules/EnemyControl.js";
import { Collision } from "./src/modules/Collision.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const player = new Player(scene.width / 2, scene.height / 2, 30, 30, 6, "white");
const bulletControl = new BulletControl(scene);
const playerControl = new PlayerControl(player, scene, bulletControl);
const enemyControl = new EnemyControl(player, scene);

const animate = () => {
  ctx.fillStyle = "rgba(0, 0, 0, .4)";
  ctx.fillRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  bulletControl.update();
  playerControl.update();
  enemyControl.update();
  Collision.manageCollision(enemyControl, bulletControl);
}

enemyControl.startEnemySpawn(.4);

animate();