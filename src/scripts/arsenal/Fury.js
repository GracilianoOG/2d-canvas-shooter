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
    this.#timer.reset();
    this.#status = true;
    this.#applyUpgrades();
  }

  deactivate() {
    this.#timer.stop();
    this.#status = false;
    this.#removeUpgrades();
  }

  isActive() {
    return this.#status;
  }

  #applyUpgrades() {
    this.#player.speed += upgrades.speed;
  }

  #removeUpgrades() {
    this.#player.speed -= upgrades.speed;
  }
}

export { Fury };
