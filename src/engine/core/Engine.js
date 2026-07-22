import * as States from "../constants/gameStates";

export class Engine {
  #rafId;
  #lastTime;
  #state;
  #isRunning;

  constructor(update, render) {
    this.update = update;
    this.render = render;

    this.#rafId = null;
    this.#lastTime = 0;
    this.#state = States.NOT_RUNNING;
    this.#isRunning = false;
  }

  get isRunning() {
    return this.#isRunning;
  }

  set isRunning(isRunning) {
    this.#isRunning = isRunning;
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

    if (this.#isRunning) {
      this.update(deltaTime);
      this.render();
    }

    this.tick();
  };

  tick() {
    this.#rafId = requestAnimationFrame(this.animate);
  }

  start() {
    this.isRunning = true;
    this.tick();
  }

  abort(state) {
    this.#state = state;
    this.#lastTime = 0;
    cancelAnimationFrame(this.#rafId);
  }
}
