import { StatusIndicator } from "../StatusIndicator.js";
import { randomInt } from "../utils/utility.js";

class Scoreboard {
  #score = 0;
  #length = 8;
  #scoreboardEl;

  static formatScore(string, length = 8) {
    return string.padStart(length, "0");
  }

  constructor() {
    this.#scoreboardEl = document.createElement("h2");
    this.#scoreboardEl.classList.add("scoreboard");
    this.#showScore(this.#score.toString());
    document.querySelector("#hud").prepend(this.#scoreboardEl);
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    this.#showScore(score);
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
