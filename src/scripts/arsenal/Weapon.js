import { gameState } from "../singletons/GameState";
import { inputManager } from "../singletons/InputManager";
import { Timer } from "../Timer";
import { Bullet } from "./Bullet";

class Weapon {
  #player;
  #shootCooldown = new Timer(150, { loop: false });

  constructor(player) {
    this.#player = player;
  }

  get shootCooldown() {
    return this.#shootCooldown;
  }

  _calcBulletPath() {
    const { x: playerX, y: playerY } = this.#player;
    const { x: mouseX, y: mouseY } = inputManager.mousePosition;

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

  shoot() {
    if (this.#shootCooldown.active) return;
    this.#shootCooldown.reset();
    this.createProjectile();
    gameState.getEntity("gameAudio").playSound("shot");
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Bullet(playerX, playerY, 5, 20, bulletAngle, this.#player.color);
  }
}

export { Weapon };
