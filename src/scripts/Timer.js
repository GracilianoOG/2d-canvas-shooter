class Timer {
  waitTime;
  elapsedTime;
  active;
  loop;
  callback;

  static timers = [];

  constructor(waitTime, options, callback = null) {
    this.waitTime = waitTime;
    this.elapsedTime = this.waitTime;
    this.active = options?.autostart ?? true;
    this.loop = options?.loop ?? true;
    this.callback = callback;
    Timer.timers.push(this);
  }

  static updateAll(deltaTime) {
    for (const t of Timer.timers) {
      t.update(deltaTime);
    }
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  reset(waitTime = this.waitTime) {
    this.elapsedTime = waitTime;
    this.start();
  }

  update(deltaTime) {
    if (!this.active) return;

    this.elapsedTime -= deltaTime;

    if (this.elapsedTime <= 0) {
      this.elapsedTime = this.waitTime;
      if (!this.loop) this.stop();
      if (this.callback) this.callback();
    }
  }

  showInSeconds() {
    return Math.ceil(this.elapsedTime / 1000);
  }

  showInMilliseconds() {
    return Math.ceil(this.elapsedTime);
  }
}

export { Timer };
