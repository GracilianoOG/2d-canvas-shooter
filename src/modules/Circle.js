import { Shape } from "./Shape.js";

class Circle extends Shape {
  #radius;

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

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

export { Circle };