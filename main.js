import { Player } from "./src/modules/Player.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const keys = {};
const player = new Player(50, 50, 30, 30, 6, "white", keys);

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  player.update(ctx, scene.width, scene.height);
}

animate();