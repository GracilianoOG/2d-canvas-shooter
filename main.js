import { Player } from "./src/modules/Player.js";
import { Projectile } from "./src/modules/Projectile.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const keys = {};
const player = new Player(50, 50, 30, 30, 6, "white", keys);
const bullets = [];

document.addEventListener("keydown", ({ code }) => {
  keys[code] = true;
});

document.addEventListener("keyup", ({ code }) => {
  keys[code] = false;
});

document.addEventListener("click", ({ clientX, clientY }) => {
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const dirX = clientX - playerCenterX;
  const dirY = clientY - playerCenterY;
  const angle = Math.atan2(dirY, dirX);

  bullets.push(
    new Projectile(playerCenterX, playerCenterY, 5, 20, angle, "yellow")
  );
});

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  for(let i = 0; i < bullets.length; i++) {
    bullets[i].update(ctx);
  }
  player.update(ctx, scene.width, scene.height);
}

animate();