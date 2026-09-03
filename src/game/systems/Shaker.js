import { Timer } from "../../game/systems/Timer";
import { randomInt } from "../../game/utils/math";

export class Shaker {
  #timer;
  #strength;
  #ctx;

  constructor(ctx) {
    this.#timer = Timer.create(0);
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
    if (this.#timer.active) {
      this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}
