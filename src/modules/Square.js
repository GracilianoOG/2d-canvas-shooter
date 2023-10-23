import { Shape } from "./Shape.js";

class Square extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Square };