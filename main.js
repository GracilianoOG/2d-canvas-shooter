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
const enemy = new Enemy(50, 50, 20, 3, "red", player);
const enemy2 = new Enemy(50, 50, 15, 4, "green", player);
const enemy3 = new Enemy(50, 50, 10, 5, "blue", player);

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  bulletControl.update();
  playerControl.update();
  enemy.update(ctx);
  enemy2.update(ctx);
  enemy3.update(ctx);
}

animate();