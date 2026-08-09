export class Timer {
  #waitTime;
  #elapsedTime;
  #active;
  #loop;
  #callback;
  #autoremove;
  #sleepTime;
  #sleepTimer;
  #isAsleep;

  static #timers = [];
  static #asleep = [];

  constructor(waitTime, options, callback = null) {
    this.#waitTime = waitTime;
    this.#elapsedTime = this.waitTime;
    this.#autoremove = options?.autodestruct ?? false;
    this.#active = options?.autostart ?? true;
    this.#loop = options?.loop ?? false;
    this.#callback = callback;

    this.#sleepTime = 10_000;
    this.#sleepTimer = this.#sleepTime;
    this.#isAsleep = false;
  }

  static updateAll(deltaTime) {
    for (const t of Timer.#timers) {
      t.update(deltaTime);
    }
  }

  static create(waitTime, options, callback = null) {
    const timer = new Timer(waitTime, options, callback);
    Timer.#timers.push(timer);
    return timer;
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

  #sleep(deltaTime) {
    this.#sleepTimer -= deltaTime;
    if (this.#sleepTimer <= 0) {
      this.remove();
      this.#sleepTimer = this.#sleepTime;
      this.#isAsleep = true;
      Timer.#asleep.push(this);
    }
  }

  #wake() {
    if (this.#isAsleep) {
      const timerIndex = Timer.#asleep.findIndex((t) => t === this);
      const timer = Timer.#asleep.splice(timerIndex, 1)[0];
      this.#isAsleep = false;
      Timer.#timers.push(timer);
    }
  }

  start() {
    this.#wake();
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
    Timer.#timers = Timer.#timers.filter((timer) => {
      return timer !== this;
    });
  }

  timeLeft() {
    return this.#elapsedTime / this.#waitTime;
  }

  update(deltaTime) {
    if (!this.#active) {
      this.#sleep(deltaTime);
      return;
    }

    const time = Math.max(this.#elapsedTime - deltaTime, 0);
    this.#elapsedTime = time;

    if (this.#elapsedTime <= 0) {
      if (!this.#loop) this.stop();
      if (this.#callback) this.#callback();
      if (this.#autoremove) {
        this.stop();
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
