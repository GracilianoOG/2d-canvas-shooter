import { playerData } from "@/data/playerData";
import { FuryMeter } from "../ui/FuryMeter";
import { LivesDisplay } from "../ui/LivesDisplay";
import { Scoreboard } from "../ui/Scoreboard";
import { CSS_CLASSES } from "../utils/constants";
import { StorageHandler } from "../utils/StorageHandler";

export class ScreenManager {
  #screens;
  #actions;
  #events;

  constructor(events) {
    this.#events = events;

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

    this.#initUIActions();
    this.#initHudElements();
  }

  #initHudElements() {
    const hud = document.querySelector("#hud");
    new Scoreboard(hud, this.#events);
    new FuryMeter(
      {
        container: hud,
        label: "fury",
        value: 100,
      },
      this.#events,
    );
    const livesDisplay = new LivesDisplay(hud, this.#events);
    livesDisplay.showCurrentLives(playerData.lives);
  }

  #initUIActions() {
    const highscore = this.get("start").querySelector(
      CSS_CLASSES.HIGHSCORE_POINTS,
    );
    highscore.textContent = StorageHandler.retrieveHighscore();

    document.addEventListener("click", (e) => {
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
    this.#events.emit("startGame");
  }

  pauseGame() {
    this.#events.emit("pauseGame");
  }

  restartGame() {
    this.toggle("restart", true);
    this.#events.emit("restartGame");
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
