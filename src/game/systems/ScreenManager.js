import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";

export class ScreenManager {
  #screens;

  constructor(game) {
    this.game = game;

    this.#screens = new Map();
    this.#screens.set("container", document.querySelector("#game-container"));
    this.#screens.set("start", document.querySelector(".start-screen"));
    this.#screens.set("pause", document.querySelector(".pause-screen"));
    this.#screens.set("restart", document.querySelector(".gameover-screen"));
    this.#screens.set("loading", document.querySelector(".loading-screen"));

    this.init();
  }

  init() {
    const highscore = this.get("start").querySelector(
      CSS_CLASSES.HIGHSCORE_POINTS,
    );
    highscore.textContent = StorageHandler.retrieveHighscore();

    document.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.closest(".pause-btn, .pause-screen")) {
        this.pauseGame();
      } else if (e.target.closest(".gameover-screen__btn")) {
        this.restartGame();
      } else if (e.target.closest(".start-screen")) {
        this.openMenu();
      }
    });
  }

  openMenu() {
    this.remove("start");
    this.show("container");
  }

  startGame() {
    this.remove("start");
    this.show("container");
    this.game.start();
  }

  pauseGame() {
    this.game.pause();
  }

  restartGame() {
    this.toggle("restart", true);
    this.game.restart();
  }

  get(name) {
    return this.#screens.get(name);
  }

  show(name) {
    this.get(name).classList.remove("hide");
  }

  toggle(name, force) {
    this.get(name).classList.toggle("hide", force);
  }

  remove(name) {
    this.get(name).remove();
    this.#screens.delete(name);
  }
}
