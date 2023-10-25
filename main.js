import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";
import { BulletControl } from "./src/modules/BulletControl.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const bulletControl = new BulletControl(scene);
const player = new Player(50, 50, 30, 30, 6, "white");
const playerControl = new PlayerControl(player, scene, bulletControl);

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  bulletControl.update();
  player.update(ctx, scene.width, scene.height);
  playerControl.move();
}

animate();