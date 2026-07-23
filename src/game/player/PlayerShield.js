import { Timer } from "../../engine/systems/Timer";
import { defaultStats } from "./playerDefaultStats";

class PlayerShield {
  #timer;

  constructor(onShieldDepletion) {
    this.#timer = Timer.create(
      defaultStats.shieldDelay,
      { autostart: false, loop: false },
      () => onShieldDepletion(),
    );
  }

  activate(delay) {
    this.#timer.waitTime = delay ?? defaultStats.shieldDelay;
    this.#timer.reset();
  }

  reset() {
    this.#timer.stop();
    this.#timer.waitTime = defaultStats.shieldDelay;
  }

  isActive() {
    return this.#timer.active;
  }

  get remainingTime() {
    return this.#timer.elapsedTime;
  }

  get currentDelay() {
    return this.#timer.waitTime;
  }
}

export { PlayerShield };
