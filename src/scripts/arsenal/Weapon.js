import { gameState } from "../singletons/GameState";
import { Timer } from "../Timer";
import { Bullet } from "./Bullet";

class Weapon {
  #player;
  #shootCooldown = new Timer(150, { loop: false });

  constructor(player) {
    this.#player = player;
  }

  #getMousePosition({ clientX, clientY }) {
    const { left: offsetX, top: offsetY } =
      gameState.getEntity("realCanvas").rect;

    return {
      x: clientX - offsetX,
      y: clientY - offsetY,
    };
  }

  #calcBulletPath(event) {
    const { x: playerX, y: playerY } = this.#player;
    const { x: mouseX, y: mouseY } = this.#getMousePosition(event);

    const { width: rWidth, height: rHeight } =
      gameState.getEntity("realCanvas");
    const { width: mWidth, height: mHeight } =
      gameState.getEntity("mainCanvas");

    const scaleXFactor = rWidth / mWidth;
    const scaleYFactor = rHeight / mHeight;
    const dirX = mouseX / scaleXFactor - playerX;
    const dirY = mouseY / scaleYFactor - playerY;
    const bulletAngle = Math.atan2(dirY, dirX);

    return { playerX, playerY, bulletAngle };
  }

  shoot(event) {
    if (this.#shootCooldown.active) return;
    this.#shootCooldown.reset();
    const { playerX, playerY, bulletAngle } = this.#calcBulletPath(event);
    new Bullet(playerX, playerY, 5, 20, bulletAngle, this.#player.color);
    gameState.getEntity("gameAudio").playSound("shot");
  }
}

export { Weapon };
