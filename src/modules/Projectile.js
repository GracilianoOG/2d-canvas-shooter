import { Circle } from "./Circle.js";

class Projectile extends Circle {
  #speed;
  #toDestroy = false;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, color);
    this.#speed = speed;
  }

  get speed() {
    return this.#speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  get toDestroy() {
    return this.#toDestroy;
  }

  set toDestroy(toDestroy) {
    this.#toDestroy = toDestroy;
  }
}

export { Projectile };