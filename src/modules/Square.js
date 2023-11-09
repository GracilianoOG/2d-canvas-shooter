import { Shape } from "./Shape.js";

class Square extends Shape {
  #width;
  #height;

  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  set width(width) {
    this.#width = width;
  }

  get height() {
    return this.#height;
  }

  set height(height) {
    this.#height = height;
  }

  get center() {
    const xCenter = this.x + this.width / 2;
    const yCenter = this.y + this.height / 2;
    return { x: xCenter, y: yCenter };
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Square };