import { Bullet } from "./Bullet";

class Weapon {
  #player;

  constructor(player) {
    this.#player = player;
  }

  #calcBulletPath({ clientX, clientY }) {
    const { x, y } = this.#player;
    const { left: offsetX, top: offsetY } =
      window.gameState["entities"].realCanvas.canvas.getBoundingClientRect();
    const scaleXFactor =
      window.gameState["entities"].realCanvas.canvas.width /
      window.gameState["entities"].mainCanvas.canvas.width;
    const scaleYFactor =
      window.gameState["entities"].realCanvas.canvas.height /
      window.gameState["entities"].mainCanvas.canvas.height;
    const dirX = (clientX - offsetX) / scaleXFactor - x;
    const dirY = (clientY - offsetY) / scaleYFactor - y;
    const angle = Math.atan2(dirY, dirX);

    return { x, y, angle };
  }

  shoot(e) {
    const { x, y, angle } = this.#calcBulletPath(e);
    new Bullet(x, y, 5, 20, angle, this.#player.color);
    window.gameState["entities"].gameAudio.playSound("shot");
  }
}

export { Weapon };
