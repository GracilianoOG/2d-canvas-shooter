import { Circle } from "./Circle.js";

class Player extends Circle {
  #speed;
  #isDead = false;

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

  get isDead() {
    return this.#isDead;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
  }

  update(ctx) {
    this.draw(ctx);
  }
}

export { Player };