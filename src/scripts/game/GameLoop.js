import * as States from "../utils/constants/gameStates";
import { randomInt } from "../utils/utility";

class GameLoop {
  #rafId;
  #lastTime;
  #state;
  #shake;
  #TARGET_FPS;

  constructor(update, render, FPS = 60) {
    this.update = update;
    this.render = render;

    this.#rafId = null;
    this.#lastTime = 0;
    this.#state = States.NOT_RUNNING;
    this.#shake = { strength: 0, timer: null };

    this.#TARGET_FPS = 1000 / FPS;
  }

  get shake() {
    return this.#shake;
  }

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;
  }

  animate = currentTime => {
    const deltaTime = currentTime - this.#lastTime;

    if (deltaTime >= this.#TARGET_FPS) {
      const maxDelta = Math.min(currentTime - this.#lastTime, this.#TARGET_FPS);
      const excessTime = deltaTime % this.#TARGET_FPS;
      this.#lastTime = currentTime - excessTime;

      if (this.#shake.timer?.active) {
        const strength = this.#shake.strength;
        const xOffset = randomInt(-strength, strength);
        const yOffset = randomInt(-strength, strength);
        // this.mainCanvas.context.translate(xOffset, yOffset);
      }
      this.update(maxDelta);
      // this.mainCanvas.context.setTransform(1, 0, 0, 1, 0, 0);
      this.render();
    }
    this.tick();
  };

  tick() {
    this.#rafId = requestAnimationFrame(this.animate);
  }

  start() {
    this.#state = States.RUNNING;
    this.tick();
  }

  stop(state) {
    this.#state = state;
    this.#lastTime = 0;
    cancelAnimationFrame(this.#rafId);
  }
}

export { GameLoop };
