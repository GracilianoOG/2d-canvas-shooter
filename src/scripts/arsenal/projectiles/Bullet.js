import { Projectile } from "@/scripts/Projectile";
import { gameState } from "@/scripts/singletons/GameState";

class Bullet extends Projectile {
  #angle;
  #damage;

  constructor(x, y, radius, speed, angle, color, damage) {
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

  isOutOfCanvas(canvas = gameState.getEntity("mainCanvas")) {
    const {
      x: bx,
      y: by,
      dimensions: { radius: br },
    } = this;
    const { width: cw, height: ch } = canvas;
    return bx < -br || bx > cw + br || by < -br || by > ch + br;
  }

  update(delta) {
    this.x += Math.cos(this.angle) * this.speed * delta;
    this.y += Math.sin(this.angle) * this.speed * delta;
    if (this.isOutOfCanvas()) {
      this.destroy();
    }
  }
}

export { Bullet };
