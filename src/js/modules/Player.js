import { Circle } from "./Circle.js";

class Player {
  #speed;
  #isDead = false;
  #shape;

  constructor(x, y, radius, speed, color) {
    this.#shape = new Circle(x, y, radius, color);
    this.#speed = speed;
  }

  // MESS
  get x() {
    return this.#shape.x;
  }

  set x(x) {
    this.#shape.x = x;
  }

  get y() {
    return this.#shape.y;
  }

  set y(y) {
    this.#shape.y = y;
  }

  get color() {
    return this.#shape.color;
  }

  set color(color) {
    this.#shape.color = color;
  }

  collidedWith(object) {
    return this.#shape.collidedWith(object);
  }

  get radius() {
    return this.#shape.dimensions.radius;
  }

  set radius(radius) {
    this.#shape.dimensions = { radius };
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
    this.#shape.draw(ctx);
  }
}

export { Player };