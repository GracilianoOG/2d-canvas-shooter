import { eventManager } from "../singletons/EventManager";

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
    this.#lifeDisplayEl.innerHTML = null;
    for (let i = 0; i < lives; i++) {
      this.#createLifeIcon();
    }
  }

  removeLife(lives) {
    const icon = this.#lifeDisplayEl.querySelector(
      `.life-icon:not(.life-icon--empty):nth-child(${lives + 1})`,
    );
    icon.classList.add("life-icon--empty");
  }

  #createLifeIcon() {
    const lifeIcon = document.createElement("div");
    lifeIcon.classList.add("life-icon");
    this.#lifeDisplayEl.append(lifeIcon);
  }

  #onPlayerRevival({ lives }) {
    this.showCurrentLives(lives);
  }

  #onPlayerHit({ lives }) {
    this.removeLife(lives);
  }

  #onPlayerHeal() {
    this.#lifeDisplayEl
      .querySelector(".life-icon--empty")
      .classList.remove("life-icon--empty");
  }
}

export { LivesDisplay };
