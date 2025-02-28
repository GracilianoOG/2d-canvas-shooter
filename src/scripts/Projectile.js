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
}

export { Projectile };
