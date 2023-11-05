import { Circle } from "./Circle.js";

class Player extends Circle {
  #speed;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, color);
    this.#speed = speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  get speed() {
    return this.#speed;
  }

  update(ctx) {
    this.draw(ctx);
  }
}

export { Player };