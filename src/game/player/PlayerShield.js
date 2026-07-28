import { Timer } from "../../engine/systems/Timer";
import { ENERGETIC_BLUE } from "../utils/constants/colors";
import { defaultStats } from "./playerDefaultStats";

class PlayerShield {
  #timer;
  #player;

  constructor(player) {
    this.#player = player;
    this.#timer = Timer.create(
      defaultStats.shieldDelay,
      { autostart: false, loop: false },
      () => this.#player.toggleGodMode(false),
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

  draw(ctx) {
    if (!this.isActive()) return;

    const { remainingTime, currentDelay } = this;
    const delayProgress = remainingTime / currentDelay;
    const padding = 15;

    this.#player.drawArc(ctx, ENERGETIC_BLUE, padding, delayProgress);
  }
}

export { PlayerShield };
