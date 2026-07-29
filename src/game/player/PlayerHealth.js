import { eventManager } from "@/engine/systems/EventManager";
import { BLOODY_RED } from "../utils/constants/colors";

export class PlayerHealth {
  #player;
  #lives;
  #maxLives;

  constructor(player, lives) {
    this.#player = player;
    this.#lives = lives;
    this.#maxLives = lives;

    eventManager.subscribe("lifeCollected", ({ collect }) => {
      if (this.#lives < this.#maxLives) {
        collect();
        this.heal();
        eventManager.emit("playerHealed");
      }
    });
  }

  get lives() {
    return this.#lives;
  }

  heal() {
    this.#lives++;
  }

  damage() {
    this.#lives--;
  }

  revive(x, y) {
    this.#player.x = x;
    this.#player.y = y;
    this.#lives = this.#maxLives;
    eventManager.emit("playerRevival", { lives: this.#lives });
  }

  draw(ctx) {
    const padding = 5;
    const health = this.#lives / this.#maxLives;
    this.#player.drawArc(ctx, BLOODY_RED, padding, health, true);
  }
}
