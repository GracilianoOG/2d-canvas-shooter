import { CSS_CLASSES } from "../utils/constants.js";
import { formatScore } from "../utils/helpers.js";

class Scoreboard {
  #score = 0;
  #length = 8;
  #scoreboard;

  constructor(parent) {
    this.#scoreboard = document.createElement("h2");
    this.#scoreboard.classList.add(CSS_CLASSES.SCOREBOARD);
    this.#showScore(this.#score.toString());
    parent.prepend(this.#scoreboard);
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    this.#showScore(score);
  }

  #showScore(score) {
    this.#scoreboard.textContent = formatScore(score.toString(), this.#length);
  }
}

export { Scoreboard };