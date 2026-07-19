import { eventManager } from "../singletons/EventManager.js";
import { randomInt } from "../utils/math.js";
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
    eventManager.subscribe("addScore", ({ score }) => this.#showScore(score));
  }

  reset() {
    this.#showScore(0);
  }

  createIndicator(score, color) {
    const { width, height } = this.#scoreboardEl.getBoundingClientRect();
    const xPos = width / 2 + randomInt(50, -50);
    const yPos = height * 3 + randomInt(5, 1);
    StatusIndicator.create(xPos, yPos, score, color);
  }

  #showScore(score) {
    this.#scoreboardEl.textContent = Scoreboard.formatScore(
      score.toString(),
      this.#length,
    );
  }
}

export { Scoreboard };
