import { Timer } from "../systems/Timer";
import { ENERGETIC_BLUE } from "../constants/colors";
import { defaultStats } from "./playerDefaultStats";

export class PlayerShield {
  #timer;
  #player;

  constructor(player, events) {
    this.#player = player;
    this.#timer = Timer.create(defaultStats.shieldDelay, {
      autostart: false,
    });

    events.on("shieldPickup", (shieldItem) => {
      this.activate(8000);
      shieldItem.collect();
    });
    events.on("playerRevival", this.reset.bind(this));
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
    const padding = 15;
    this.#player.drawArc(ctx, ENERGETIC_BLUE, padding, this.#timer.timeLeft());
  }
}
