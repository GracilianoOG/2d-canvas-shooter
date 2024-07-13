import { Shape } from "./Shape.js";

class Circle extends Shape {
  #radius;

  constructor(x, y, radius, color) {
    super(x, y, color);
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius) {
    this.#radius = radius;
  }

  get dimensions() {
    return { radius: this.#radius };
  }

  set dimensions({ radius }) {
    this.#radius = radius;
  }

  collidedWith(object) {
    return Math.hypot(this.x - object.x, this.y - object.y) < this.radius + object.radius;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.shadowColor = this.color;
    // ctx.shadowBlur = 8;
    // ctx.globalCompositeOperation = "lighten";
    ctx.fill();
    ctx.restore();
  }
}

export { Circle };