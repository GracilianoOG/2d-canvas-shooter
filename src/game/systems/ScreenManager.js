import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";

export class ScreenManager {
  #screens;
  #actions;

  constructor(game) {
    this.game = game;

    this.#screens = new Map();
    this.#actions = {
      pause: this.pauseGame.bind(this),
      restart: this.restartGame.bind(this),
      start: this.openMenu.bind(this),
      play: this.startGame.bind(this),
    };

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

      const clicked = e.target.closest("[data-action]");
      const action = clicked?.dataset.action;

      if (action && this.#actions[action]) {
        this.#actions[action]();
      }
    });
  }

  openMenu() {
    this.remove("start");
    this.show("container");
    this.show("menu");
  }

  startGame() {
    this.toggle("menu", true);
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
