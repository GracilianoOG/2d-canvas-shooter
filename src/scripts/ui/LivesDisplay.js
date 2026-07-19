import { eventManager } from "../engine/systems/EventManager";

const ICON_CLASS = "life-icon";
const EMPTY_CLASS = `${ICON_CLASS}--empty`;

class LivesDisplay {
  #display;

  constructor(container) {
    const lifeDisplay = document.createElement("div");
    lifeDisplay.classList.add("lives-display");
    container.append(lifeDisplay);

    this.#display = lifeDisplay;

    eventManager.subscribe("playerRevival", this.#onPlayerRevival.bind(this));
    eventManager.subscribe("playerHit", this.#onPlayerHit.bind(this));
    eventManager.subscribe("playerHealed", this.#onPlayerHeal.bind(this));
  }

  showCurrentLives(lives) {
    this.#display.innerHTML = null;
    for (let i = 0; i < lives; i++) {
      this.#createLifeIcon();
    }
  }

  #removeLife(lives) {
    const icon = this.#display.querySelector(
      `.${ICON_CLASS}:not(.${EMPTY_CLASS}):nth-child(${lives + 1})`,
    );
    icon.classList.add(EMPTY_CLASS);
  }

  #createLifeIcon() {
    const lifeIcon = document.createElement("div");
    lifeIcon.classList.add(ICON_CLASS);
    this.#display.append(lifeIcon);
  }

  #onPlayerRevival({ lives }) {
    this.showCurrentLives(lives);
  }

  #onPlayerHit({ lives }) {
    this.#removeLife(lives);
  }

  #onPlayerHeal() {
    this.#display
      .querySelector(`.${EMPTY_CLASS}`)
      .classList.remove(EMPTY_CLASS);
  }
}

export { LivesDisplay };
