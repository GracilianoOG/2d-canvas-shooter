import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";

export class ScreenManager {
  #screens;

  constructor(game) {
    this.game = game;

    this.#screens = new Map();

    const screens = document.querySelectorAll("[data-screen]");
    screens.forEach((screenEl) => {
      this.#screens.set(screenEl.dataset.screen, screenEl);
    });

    this.init();
  }

  init() {
    const highscore = this.get("start").querySelector(
      CSS_CLASSES.HIGHSCORE_POINTS,
    );
    highscore.textContent = StorageHandler.retrieveHighscore();

    document.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.closest("[data-action='pause']")) {
        this.pauseGame();
      } else if (e.target.closest("[data-action='restart']")) {
        this.restartGame();
      } else if (e.target.closest("[data-action='start']")) {
        this.openMenu();
      }
    });
  }

  openMenu() {
    this.remove("start");
    this.show("container");
    this.show("menu");
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
