import { Timer } from "./Timer";
import { randomInt } from "./utils/math";

class Shaker {
  #timer;
  #strength;
  #ctx;

  constructor(ctx) {
    this.#timer = new Timer(0, { loop: false });
    this.#ctx = ctx;
  }

  start(strength, duration) {
    this.#timer.reset(duration);
    this.#strength = strength;
  }

  shake() {
    if (this.#timer.active) {
      const strength = this.#strength;
      const xOffset = randomInt(strength, -strength);
      const yOffset = randomInt(strength, -strength);
      this.#ctx.translate(xOffset, yOffset);
    }
  }

  restore() {
    this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export { Shaker };
