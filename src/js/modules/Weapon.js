import { Bullet } from "./Bullet";

class Weapon {
  #player;

  constructor(player) {
    this.#player = player;
  }

  #calcBulletPath({ clientX, clientY }) {
    const { x, y } = this.#player;
    const dirX = clientX - x;
    const dirY = clientY - y;
    const angle = Math.atan2(dirY, dirX);

    return { x, y, angle };
  }

  shoot(e) {
    const { x, y, angle } = this.#calcBulletPath(e);
    const bullet = new Bullet(x, y, 5, 20, angle, this.#player.color);
    window.gameState["entities"].bullets.push(bullet);
    window.gameState["entities"].gameAudio.playSound("shot");
  }
}

export { Weapon };
