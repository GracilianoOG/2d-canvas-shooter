import { Shape } from "./Shape.js";

class Square extends Shape {
  #width;
  #height;

  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.#width = width;
    this.#height = height;
  }

  set width(width) {
    this.#width = width;
  }

  set height(height) {
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Square };