import { eventManager } from "../../engine/systems/EventManager.js";
import { StatusIndicator } from "./StatusIndicator.js";

class Scoreboard {
  #length = 7;
  #scoreboardEl;

  static formatScore(string, length = 7) {
    return string.padStart(length, "0");
  }

  constructor(containerEl) {
    this.#scoreboardEl = document.createElement("h2");
    this.#scoreboardEl.classList.add("scoreboard");
    containerEl.prepend(this.#scoreboardEl);
    this.#showScore(0);
    eventManager.subscribe("setScore", ({ score }) => this.#showScore(score));
  }

  createIndicator(position, score, color) {
    StatusIndicator.create(position.x, position.y, score, color);
  }

  #showScore(score) {
    this.#scoreboardEl.textContent = Scoreboard.formatScore(
      score.toString(),
      this.#length,
    );
  }
}

export { Scoreboard };
