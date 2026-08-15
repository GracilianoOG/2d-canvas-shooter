import { BLOODY_RED } from "../constants/colors";
import { playerData } from "@/data/playerData";

export class PlayerHealth {
  #player;
  #lives;
  #maxLives;
  #events;

  constructor(player, events) {
    this.#player = player;
    this.#lives = playerData.lives;
    this.#maxLives = playerData.lives;
    this.#events = events;

    events.on("lifePickup", (item) => {
      if (this.#lives < this.#maxLives) {
        item.collect();
        this.heal();
        events.emit("playerHealed");
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
    this.#events.emit("playerRevival", { lives: this.#lives });
  }

  draw(ctx) {
    const padding = 5;
    const health = this.#lives / this.#maxLives;
    this.#player.drawArc(ctx, BLOODY_RED, padding, health, true);
  }
}
