import { eventManager } from "./singletons/EventManager";

class LivesDisplay {
  #lifeDisplayEl;

  constructor(container) {
    const lifeDisplay = document.createElement("div");
    lifeDisplay.classList.add("lives-display");
    container.append(lifeDisplay);

    this.#lifeDisplayEl = lifeDisplay;

    eventManager.subscribe("playerRevival", this.#onPlayerRevival.bind(this));
    eventManager.subscribe("playerHit", this.#onPlayerHit.bind(this));
    eventManager.subscribe("playerHealed", this.#onPlayerHeal.bind(this));
  }

  showCurrentLives(lives) {
    for (let i = 0; i < lives; i++) {
      this.#createLifeIcon();
    }
  }

  removeLife() {
    this.#lifeDisplayEl.lastChild.remove();
  }

  #createLifeIcon() {
    const lifeIcon = document.createElement("div");
    lifeIcon.classList.add("live-icon");
    this.#lifeDisplayEl.append(lifeIcon);
  }

  #onPlayerRevival({ lives }) {
    this.showCurrentLives(lives);
  }

  #onPlayerHit() {
    this.removeLife();
  }

  #onPlayerHeal() {
    this.#createLifeIcon();
  }
}

export { LivesDisplay };
