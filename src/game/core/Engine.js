import { States } from "../../game/constants/gameStates";

export class Engine {
  #rafId;
  #lastTime;
  #state;

  constructor(update, render) {
    this.update = update;
    this.render = render;

    this.#rafId = null;
    this.#lastTime = null;
    this.#state = States.OFF;
  }

  get state() {
    return this.#state;
  }

  #tick() {
    this.#rafId = requestAnimationFrame(this.animate);
  }

  animate = (currentTime) => {
    const deltaTime = currentTime - this.#lastTime;
    this.#lastTime = currentTime;

    if (this.#state === States.RUNNING) {
      this.update(deltaTime);
      this.render();
    }

    this.#tick();
  };

  start() {
    if (this.#state === States.OFF) {
      this.#lastTime = performance.now();
      this.#tick();
    }
    this.#state = States.RUNNING;
  }

  stop() {
    this.#state = States.STOPPED;
  }

  abort() {
    this.#lastTime = null;
    this.#state = States.OFF;
    cancelAnimationFrame(this.#rafId);
  }
}
