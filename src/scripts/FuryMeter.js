import { eventManager } from "./singletons/EventManager";

const FuryMeterState = Object.freeze({
  EMPTY: 0,
  FULL: 100,
});

class FuryMeter {
  #furyMeterEl;
  #furyMeterFillEl;
  #furyText;
  #fury = FuryMeterState.EMPTY;

  constructor(containerEl) {
    this.#furyMeterEl = document.createElement("div");
    this.#furyMeterEl.classList.add("fury-meter");

    this.#furyMeterFillEl = document.createElement("div");
    this.#furyMeterFillEl.classList.add("fury-meter__fill");

    this.#furyText = document.createElement("span");
    this.#furyText.textContent = "fury";
    this.#furyText.classList.add("fury-meter__text");

    this.#furyMeterEl.append(this.#furyMeterFillEl);
    this.#furyMeterEl.append(this.#furyText);

    containerEl.append(this.#furyMeterEl);

    eventManager.subscribe("fillFuryMeter", ({ amount }) => this.fill(amount));
    eventManager.subscribe("checkFuryMeterToFill", ({ item, amount }) => {
      if (!this.isFull()) {
        this.fill(amount);
        item.collect();
      }
    });
    eventManager.subscribe("FuryActivation", this.#onFuryActivation.bind(this));
    eventManager.subscribe("emptyFuryMeter", this.#onEmptyFuryMeter.bind(this));
  }

  #onEmptyFuryMeter({ timePerc }) {
    this.#fury = timePerc * FuryMeterState.FULL;
    this.#updateFuryMeter();
  }

  #onFuryActivation() {
    if (this.isFull()) {
      eventManager.emit("activateFury");
    }
  }

  #validateFury() {
    if (this.#fury > FuryMeterState.FULL) {
      this.#fury = FuryMeterState.FULL;
    } else if (this.#fury < FuryMeterState.EMPTY) {
      this.#fury = FuryMeterState.EMPTY;
    }
  }

  #updateFuryMeter() {
    this.#validateFury();

    this.#furyMeterFillEl.style.width = `${this.#fury}%`;

    if (this.#fury !== FuryMeterState.FULL) {
      this.#furyMeterEl.classList.remove("fury-meter--full");
      this.#furyMeterFillEl.classList.remove("fury-meter__fill--full");
    } else {
      this.#furyMeterEl.classList.add("fury-meter--full");
      this.#furyMeterFillEl.classList.add("fury-meter__fill--full");
    }
  }

  fill(furyPercentage) {
    this.#fury += furyPercentage;
    this.#updateFuryMeter();
  }

  unfill(furyPercentage) {
    this.#fury -= furyPercentage;
    this.#updateFuryMeter();
  }

  empty() {
    this.#fury = FuryMeterState.EMPTY;
    this.#updateFuryMeter();
  }

  isFull() {
    return this.#fury === FuryMeterState.FULL;
  }
}

export { FuryMeter };
