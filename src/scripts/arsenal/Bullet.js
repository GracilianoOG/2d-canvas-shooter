import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";

class Bullet extends Projectile {
  #angle;
  #damage;

  constructor(x, y, radius, speed, angle, color, damage = 10) {
    super(x, y, radius, speed, color);
    this.#angle = angle;
    this.#damage = damage;
  }

  get angle() {
    return this.#angle;
  }

  set angle(angle) {
    this.#angle = angle;
  }

  get damage() {
    return this.#damage;
  }

  #isOutOfCanvas(canvas) {
    const {
      x: bx,
      y: by,
      dimensions: { radius: br },
    } = this;
    const { width: cw, height: ch } = canvas;
    return bx < -br || bx > cw + br || by < -br || by > ch + br;
  }

  #move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  update() {
    this.#move();
    if (this.#isOutOfCanvas(gameState.getEntity("mainCanvas").context))
      this.destroy();
  }
}

export { Bullet };
