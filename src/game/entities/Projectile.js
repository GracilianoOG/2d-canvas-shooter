import { Entity } from "./Entity.js";

class Projectile extends Entity {
  #speed;
  #angle;

  constructor(radius, speed, color, angle = 0) {
    super(radius, color);
    this.speed = speed;
    this.#angle = angle;
  }

  get speed() {
    return this.#speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  get angle() {
    return this.#angle;
  }

  set angle(angle) {
    this.#angle = angle;
  }

  shrink(amount) {
    const newRadius = Math.max(this.radius - amount, 0);
    this.radius = newRadius;
    if (!newRadius) this.destroy();
  }

  grow(amount) {
    this.radius += amount;
  }
}

export { Projectile };
