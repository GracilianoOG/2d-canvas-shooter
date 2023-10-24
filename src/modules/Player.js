import { Square } from "./Square.js";

class Player extends Square {
  #speed;

  constructor(x, y, width, height, speed, color) {
    super(x, y, width, height, color);
    this.#speed = speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  get speed() {
    return this.#speed;
  }

  update(ctx, canvasWidth, canvasHeight) {
    this.draw(ctx);
  }
}

export { Player };