import { Timer } from "../Timer.js";

const upgrades = {
  speed: 5,
};

class Fury {
  #timer;
  #status;
  #player;

  constructor(player, duration = 5000) {
    this.#timer = new Timer(
      duration,
      { autostart: false, loop: false },
      this.deactivate.bind(this)
    );
    this.#status = false;
    this.#player = player;
  }

  activate() {
    if (this.#status) {
      return;
    }
    this.#timer.start();
    this.#status = true;
    this.#player.speed += upgrades.speed;
  }

  deactivate() {
    this.#status = false;
    this.#player.speed -= upgrades.speed;
  }

  isActive() {
    return this.#status;
  }
}

export { Fury };
