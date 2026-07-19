import { Shaker } from "../systems/Shaker";
import * as States from "../constants/gameStates";

class GameLoop {
  #rafId;
  #lastTime;
  #state;
  #shaker;
  #TARGET_FPS;

  constructor(update, render, configs) {
    this.update = update;
    this.render = render;

    this.#rafId = null;
    this.#lastTime = 0;
    this.#state = States.NOT_RUNNING;
    this.#shaker = new Shaker(configs.ctx);

    this.#TARGET_FPS = 1000 / (configs?.FPS ?? 60);
  }

  get shaker() {
    return this.#shaker;
  }

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;
  }

  animate = (currentTime) => {
    const deltaTime = currentTime - this.#lastTime;

    if (deltaTime >= this.#TARGET_FPS) {
      const maxDelta = Math.min(currentTime - this.#lastTime, this.#TARGET_FPS);
      const excessTime = deltaTime % this.#TARGET_FPS;
      this.#lastTime = currentTime - excessTime;

      this.#shaker.shake();
      this.update(maxDelta);
      this.#shaker.restore();
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
