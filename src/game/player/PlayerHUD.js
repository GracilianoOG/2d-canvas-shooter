import { BLOODY_RED, LIGHT_YELLOW } from "../utils/constants/colors";
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

  drawHUD(ctx) {
    this.#drawHealth(ctx);
  }
}

export { PlayerHUD };
