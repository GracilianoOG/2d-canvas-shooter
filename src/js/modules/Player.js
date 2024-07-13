import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";

class Player extends Entity {
  #isDead = false;

  constructor(x, y, radius, speed, color) {
    super(new Circle(x, y, radius, color));
    this.speed = speed;
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