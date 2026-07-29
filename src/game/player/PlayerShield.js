import { eventManager } from "@/engine/systems/EventManager";
import { Timer } from "../../engine/systems/Timer";
import { ENERGETIC_BLUE } from "../utils/constants/colors";
import { defaultStats } from "./playerDefaultStats";

class PlayerShield {
  #timer;
  #player;

  constructor(player) {
    this.#player = player;
    this.#timer = Timer.create(defaultStats.shieldDelay, {
      autostart: false,
      loop: false,
    });

    eventManager.subscribe("shieldCollected", () => this.activate(8000));
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

  draw(ctx) {
    if (!this.isActive()) return;

    const { elapsedTime, waitTime } = this.#timer;
    const delayProgress = elapsedTime / waitTime;
    const padding = 15;

    this.#player.drawArc(ctx, ENERGETIC_BLUE, padding, delayProgress);
  }
}

export { PlayerShield };
