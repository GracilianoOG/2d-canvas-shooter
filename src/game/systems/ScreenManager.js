import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";

export class ScreenManager {
  constructor(game) {
    this.game = game;
    this.container = document.querySelector("#game-container");
    this.start = document.querySelector(".start-screen");
    this.pause = document.querySelector(".pause-screen");
    this.restart = document.querySelector(".gameover-screen");
    this.loading = document.querySelector(".loading-screen");
    this.init();
  }

  init() {
    const highscore = this.start.querySelector(CSS_CLASSES.HIGHSCORE_POINTS);
    highscore.textContent = StorageHandler.retrieveHighscore();

    document.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.closest(".pause-btn, .pause-screen")) {
        this.pauseGame();
      } else if (e.target.closest(".gameover-screen__btn")) {
        this.restartGame();
      } else if (e.target.closest(".start-screen")) {
        this.startGame();
      }
    });
  }

  startGame() {
    this.remove("start");
    this.container.classList.remove("hide");
    this.game.start();
  }

  pauseGame() {
    this.game.pause();
  }

  restartGame() {
    this.restart.classList.add("hide");
    this.game.restart();
  }

  get(name) {
    return this[name];
  }

  show(name) {
    this[name].classList.remove("hide");
  }

  remove(name) {
    this[name].remove();
    this[name] = null;
  }
}
