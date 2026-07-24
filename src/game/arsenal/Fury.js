import { eventManager } from "../../engine/systems/EventManager.js";
import { Timer } from "../../engine/systems/Timer.js";

const upgrades = {
  speedMultiplier: 1.25,
  weaponCooldown: 30,
};

class Fury {
  #timer;
  #status;
  #duration;

  constructor(duration = 5000) {
    this.#timer = Timer.create(
      duration,
      { autostart: false, loop: false },
      this.deactivate.bind(this),
    );
    this.#status = false;
    this.#duration = duration;
    eventManager.subscribe("activateFury", () => this.activate());
    eventManager.subscribe("playerDeath", this.deactivate.bind(this));
  }

  get timer() {
    return this.#timer;
  }

  get duration() {
    return this.#duration;
  }

  activate() {
    if (this.isActive()) return;
    this.#timer.reset();
    this.#status = true;
    eventManager.emit("activatedFury");
  }

  deactivate() {
    if (!this.isActive()) return;
    this.#timer.stop();
    this.#status = false;
    eventManager.emit("deactivateFury");
  }

  isActive() {
    return this.#status;
  }
}

export { Fury };
