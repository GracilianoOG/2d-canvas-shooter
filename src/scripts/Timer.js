class Timer {
  #waitTime;
  #elapsedTime;
  #active;
  #loop;
  #callback;
  #options;

  static timers = [];

  constructor(waitTime, options, callback = null) {
    this.#options = { ...options };
    this.#waitTime = waitTime;
    this.#elapsedTime = this.waitTime;
    this.#active = options?.autostart ?? true;
    this.#loop = options?.loop ?? true;
    this.#callback = callback;
    Timer.timers.push(this);
  }

  static updateAll(deltaTime) {
    for (const t of Timer.timers) {
      t.update(deltaTime);
    }
  }

  get elapsedTime() {
    return this.#elapsedTime;
  }

  get waitTime() {
    return this.#waitTime;
  }

  set waitTime(waitTime) {
    this.#waitTime = waitTime;
  }

  get active() {
    return this.#active;
  }

  get loop() {
    return this.#loop;
  }

  start() {
    this.#active = true;
  }

  stop() {
    this.#active = false;
  }

  reset(waitTime = this.#waitTime) {
    this.#elapsedTime = waitTime;
    this.start();
  }

  remove() {
    Timer.timers = Timer.timers.filter((timer) => {
      return timer !== this;
    });
  }

  update(deltaTime) {
    if (!this.#active) return;

    const time = Math.max(this.#elapsedTime - deltaTime, 0);
    this.#elapsedTime = time;

    if (this.#elapsedTime <= 0) {
      if (!this.#loop) this.stop();
      if (this.#callback) this.#callback();
      if (this.#options.autodestruct) {
        this.remove();
        return;
      }
      this.#elapsedTime = this.#waitTime;
    }
  }

  showInSeconds() {
    return Math.ceil(this.#elapsedTime / 1000);
  }

  showInMilliseconds() {
    return Math.ceil(this.#elapsedTime);
  }
}

export { Timer };
