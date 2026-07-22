export class Engine {
  #rafId;
  #lastTime;
  #isRunning;

  constructor(update, render) {
    this.update = update;
    this.render = render;

    this.#rafId = null;
    this.#lastTime = null;
    this.#isRunning = false;
  }

  get isRunning() {
    return this.#isRunning;
  }

  set isRunning(isRunning) {
    this.#isRunning = isRunning;
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

  stop() {
    this.isRunning = false;
  }

  abort() {
    this.#lastTime = null;
    cancelAnimationFrame(this.#rafId);
  }
}
