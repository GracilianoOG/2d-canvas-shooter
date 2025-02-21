import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";
import { PlayerController } from "./PlayerController.js";

class Player extends Entity {
  #isDead = false;
  controller = new PlayerController(this);

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
}

export { Player };
