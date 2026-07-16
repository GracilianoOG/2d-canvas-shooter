import { Entity } from "./Entity.js";

class Projectile extends Entity {
  #speed;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, color);
    this.speed = speed;
  }

  get speed() {
    return this.#speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  shrink(amount) {
    const newRadius = Math.max(this.radius - amount, 0);
    this.radius = newRadius;
    if (!newRadius) this.destroy();
  }
}

export { Projectile };
