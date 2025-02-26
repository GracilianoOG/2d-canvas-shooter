import { Bullet } from "./Bullet";

class Weapon {
  #player;

  constructor(player) {
    this.#player = player;
  }

  #calcBulletPath({ clientX, clientY }) {
    const { x: playerX, y: playerY } = this.#player;

    const { width: rWidth, height: rHeight } =
      window.gameState.entities.realCanvas;
    const { width: mWidth, height: mHeight } =
      window.gameState.entities.mainCanvas;

    const { left: offsetX, top: offsetY } =
      window.gameState.entities.realCanvas.canvas.getBoundingClientRect();

    const scaleXFactor = rWidth / mWidth;
    const scaleYFactor = rHeight / mHeight;
    const dirX = (clientX - offsetX) / scaleXFactor - playerX;
    const dirY = (clientY - offsetY) / scaleYFactor - playerY;
    const angle = Math.atan2(dirY, dirX);

    return { x, y, angle };
  }

  shoot(e) {
    const { x, y, angle } = this.#calcBulletPath(e);
    new Bullet(x, y, 5, 20, angle, this.#player.color);
    window.gameState.entities.gameAudio.playSound("shot");
  }
}

export { Weapon };
