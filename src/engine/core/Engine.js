import { Shaker } from "../systems/Shaker";
import * as States from "../constants/gameStates";

export class Engine {
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
    if (!this.#lastTime) {
      this.#lastTime = currentTime;
    }

    const deltaTime = currentTime - this.#lastTime;

    this.#lastTime = currentTime;

    this.#shaker.shake();
    this.update(deltaTime);
    this.#shaker.restore();
    this.render();

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
