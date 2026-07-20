import {
  BLOODY_RED,
  ENERGETIC_BLUE,
  LIGHT_YELLOW,
} from "../utils/constants/colors";
import { defaultStats } from "./playerDefaultStats";

class PlayerHUD {
  #player;

  constructor(player) {
    this.#player = player;
  }

  #drawHealth(ctx) {
    const padding = 5;
    const health = this.#player.lives / defaultStats.lives;
    this.#player.drawArc(ctx, BLOODY_RED, padding, health, true);
  }

  #drawShieldDelay(ctx) {
    if (!this.#player.shield.isActive()) return;

    const { remainingTime, currentDelay } = this.#player.shield;
    const delayProgress = remainingTime / currentDelay;
    const padding = 15;

    this.#player.drawArc(ctx, ENERGETIC_BLUE, padding, delayProgress);
  }

  #drawWeaponDuration(ctx) {
    if (this.#player.arsenal.durationTimer.active) {
      const gunDelay = this.#player.arsenal.durationTimer.waitTime;
      const { elapsedTime } = this.#player.arsenal.durationTimer;
      const timePerc = elapsedTime / gunDelay;
      const padding = 10;

      this.#player.drawArc(ctx, LIGHT_YELLOW, padding, timePerc);
    }
  }

  drawHUD(ctx) {
    this.#drawHealth(ctx);
    this.#drawShieldDelay(ctx);
    this.#drawWeaponDuration(ctx);
  }
}

export { PlayerHUD };
