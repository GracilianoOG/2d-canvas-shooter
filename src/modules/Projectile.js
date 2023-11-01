import { Circle } from "./Circle.js";

class Projectile extends Circle {
  #speed;
  #toDestroy = false;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, color);
    this.#speed = speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  set toDestroy(toDestroy) {
    this.#toDestroy = toDestroy;
  }

  get speed() {
    return this.#speed;
  }

  get toDestroy() {
    return this.#toDestroy;
  }
}

export { Projectile };