import { StatusIndicator } from "../StatusIndicator.js";
import { randomInt } from "../utils/utility.js";

class Scoreboard {
  #score = 0;
  #length = 7;
  #scoreboardEl;

  static formatScore(string, length = 7) {
    return string.padStart(length, "0");
  }

  constructor(containerEl) {
    this.#scoreboardEl = document.createElement("h2");
    this.#scoreboardEl.classList.add("scoreboard");
    this.#showScore(this.#score.toString());
    containerEl.prepend(this.#scoreboardEl);
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    this.#showScore(score);
  }

  reset() {
    this.#score = 0;
    this.#showScore(0);
  }

  createIndicator(score, color) {
    const { width, height } = this.#scoreboardEl.getBoundingClientRect();
    const xPos = width / 2 + randomInt(-50, 50);
    const yPos = height * 3 + randomInt(1, 5);
    this.score += score;
    StatusIndicator.create(xPos, yPos, score, color);
  }

  #showScore(score) {
    this.#scoreboardEl.textContent = Scoreboard.formatScore(
      score.toString(),
      this.#length
    );
  }
}

export { Scoreboard };
