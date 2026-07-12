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

  removeLife() {
    const elements = Array.from(
      this.#lifeDisplayEl.querySelectorAll(".life-icon"),
    ).reverse();

    for (const el of elements) {
      const foundEl = !el.classList.contains("life-icon--empty");
      if (foundEl) {
        el.classList.add("life-icon--empty");
        return;
      }
    }
  }

  #createLifeIcon() {
    const lifeIcon = document.createElement("div");
    lifeIcon.classList.add("life-icon");
    this.#lifeDisplayEl.append(lifeIcon);
  }

  #onPlayerRevival({ lives }) {
    this.showCurrentLives(lives);
  }

  #onPlayerHit() {
    this.removeLife();
  }

  #onPlayerHeal() {
    this.#lifeDisplayEl
      .querySelector(".life-icon--empty")
      .classList.remove("life-icon--empty");
  }
}

export { LivesDisplay };
