import { gameState } from "../singletons/GameState";
import { Bullet } from "./Bullet";

class Weapon {
  #player;

  constructor(player) {
    this.#player = player;
  }

  #calcBulletPath({ clientX, clientY, currentTarget }) {
    const { x: playerX, y: playerY } = this.#player;

    const { width: rWidth, height: rHeight } =
      gameState.getEntity("realCanvas");
    const { width: mWidth, height: mHeight } =
      gameState.getEntity("mainCanvas");

    const { left: offsetX, top: offsetY } =
      currentTarget.getBoundingClientRect();

    const scaleXFactor = rWidth / mWidth;
    const scaleYFactor = rHeight / mHeight;
    const dirX = (clientX - offsetX) / scaleXFactor - playerX;
    const dirY = (clientY - offsetY) / scaleYFactor - playerY;
    const angle = Math.atan2(dirY, dirX);

    return { playerX, playerY, angle };
  }

  shoot(e) {
    const { playerX, playerY, angle } = this.#calcBulletPath(e);
    new Bullet(playerX, playerY, 5, 20, angle, this.#player.color);
    gameState.getEntity("gameAudio").playSound("shot");
  }
}

export { Weapon };
