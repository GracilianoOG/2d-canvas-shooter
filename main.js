import { PlayerControl } from "./src/modules/PlayerControl.js";
import { Player } from "./src/modules/Player.js";

const scene = document.querySelector("#scene");
scene.width = innerWidth;
scene.height = innerHeight;
const ctx = scene.getContext("2d");
const player = new Player(50, 50, 30, 30, 6, "white");
const playerControl = new PlayerControl(player, scene);

const checkBulletOutOfBounds = (bullet) => {
  const { x, y, radius } = bullet;

  if(x < -radius || x > scene.width + radius || y < -radius || y > scene.height + radius) {
    bullet.hasCollided = true;
  }
}

const animate = () => {
  ctx.clearRect(0, 0, scene.width, scene.height);
  requestAnimationFrame(animate);
  for(let i = 0; i < playerControl.bullets.length; i++) {
    const bullet = playerControl.bullets[i];
    bullet.update(ctx);
    checkBulletOutOfBounds(bullet);
  }
  playerControl.bullets = playerControl.bullets.filter(bullet => !bullet.hasCollided);
  player.update(ctx, scene.width, scene.height);
  playerControl.move();
}

animate();