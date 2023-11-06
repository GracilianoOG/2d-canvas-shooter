import { Shape } from "./Shape.js";

class Circle extends Shape {
  #radius;
  #PI = Math.PI;

  constructor(x, y, radius, color) {
    super(x, y, color);
    this.#radius = radius;
  }

  set radius(radius) {
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  get PI() {
    return this.#PI;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.#PI * 2);
    ctx.fill();
  }

  collidedWith(object) {
    return Math.hypot(this.x - object.x, this.y - object.y) < this.radius + object.radius;
  }
}

export { Circle };