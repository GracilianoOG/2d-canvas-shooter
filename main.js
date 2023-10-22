import { Player } from "./src/modules/Player.js";
import { Projectile } from "./src/modules/Projectile.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const keys = {};
const player = new Player(50, 50, 30, 30, 6, "white", keys);
let bullets = [];

const checkBulletOutOfBounds = (bullet) => {
  const { x, y, radius } = bullet;

  if(x < -radius || x > scene.width + radius || y < -radius || y > scene.height + radius) {
    bullet.hasCollided = true;
  }
}

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

  console.log(bullets);
});

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  for(let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    bullet.update(ctx);
    checkBulletOutOfBounds(bullet);
  }
  bullets = bullets.filter(bullet => !bullet.hasCollided);
  player.update(ctx, scene.width, scene.height);
}

animate();