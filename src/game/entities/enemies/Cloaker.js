import { Enemy } from "./Enemy";

const LIMIT = 5;
const THRESHOLD = 30;

class Cloaker extends Enemy {
  #opacity = THRESHOLD;

  takeDamage(damage) {
    super.takeDamage(damage);
    this.#opacity = THRESHOLD;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.#opacity / 100;
    super.draw(ctx);
    ctx.restore();
  }

  update(delta) {
    super.update(delta);
    if (this.#opacity > LIMIT) {
      this.#opacity = Math.max(this.#opacity - delta * 10, LIMIT);
    }
  }
}

export { Cloaker };
