import { Circle } from "./Circle.js";

class Projectile extends Circle {
  #speed;
  #hasCollided = false;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, color);
    this.#speed = speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  set hasCollided(hasCollided) {
    this.#hasCollided = hasCollided;
  }

  get speed() {
    return this.#speed;
  }

  get hasCollided() {
    return this.#hasCollided;
  }
}

export { Projectile };