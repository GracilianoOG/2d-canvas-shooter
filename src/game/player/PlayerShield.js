import { Timer } from "../systems/Timer";
import { ENERGETIC_BLUE } from "../constants/colors";
import { playerData } from "@/data/playerData";

export class PlayerShield {
  #timer;
  #player;

  constructor(player, events) {
    this.#player = player;
    this.#timer = Timer.create(playerData.damageCooldown, {
      autostart: false,
    });

    events.on("shieldPickup", (shieldItem) => {
      this.activate(playerData.shieldCooldown);
      shieldItem.collect();
    });
    events.on("playerRevival", this.reset.bind(this));
  }

  activate(delay) {
    this.#timer.waitTime = delay ?? playerData.damageCooldown;
    this.#timer.reset();
  }

  reset() {
    this.#timer.stop();
    this.#timer.waitTime = playerData.damageCooldown;
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
