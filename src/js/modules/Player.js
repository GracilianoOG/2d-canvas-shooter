import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";

class Player extends Entity {
  #speed;
  #isDead = false;

  constructor(x, y, radius, speed, color) {
    super(new Circle(x, y, radius, color));
    this.#speed = speed;
  }

  // MESS
  collidedWith(object) {
    return this.shape.collidedWith(object);
  }
  // MESS

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
    this.shape.draw(ctx);
  }
}

export { Player };