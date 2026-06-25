import { eventManager } from "./singletons/EventManager";
import { clamp } from "./utils/math";

const FuryMeterState = Object.freeze({
  EMPTY: 0,
  FULL: 100,
});

class FuryMeter {
  #furyMeterBar;
  #furyMeterFill;
  #furyLabel;
  #furyValue;

  constructor(containerEl) {
    this.#furyMeterBar = document.createElement("div");
    this.#furyMeterBar.classList.add("fury-meter");

    this.#furyMeterFill = document.createElement("div");
    this.#furyMeterFill.classList.add("fury-meter__fill");

    this.#furyLabel = document.createElement("span");
    this.#furyLabel.textContent = "fury";
    this.#furyLabel.classList.add("fury-meter__text");

    this.#furyMeterBar.append(this.#furyMeterFill);
    this.#furyMeterBar.append(this.#furyLabel);

    containerEl.append(this.#furyMeterBar);

    this.#furyValue = 0;

    eventManager.subscribe("fillFuryMeter", ({ amount }) => this.fill(amount));
    eventManager.subscribe("checkFuryMeterToFill", ({ item, amount }) => {
      if (!this.isFull()) {
        this.fill(amount);
        item.collect();
      }
    });
    eventManager.subscribe(
      "shouldActivateFury",
      this.#onFuryActivation.bind(this),
    );
    eventManager.subscribe("emptyFuryMeter", this.#onEmptyFuryMeter.bind(this));
  }

  #onEmptyFuryMeter({ timePerc }) {
    this.#furyValue = timePerc * FuryMeterState.FULL;
    this.#updateFuryMeter();
  }

  #onFuryActivation() {
    if (this.isFull()) {
      eventManager.emit("activateFury");
    }
  }

  #updateFuryMeter() {
    this.#furyMeterFill.style.width = `${this.#furyValue}%`;

    this.#furyMeterBar.classList.toggle("fury-meter--full", this.isFull());
    this.#furyMeterFill.classList.toggle(
      "fury-meter__fill--full",
      this.isFull(),
    );
  }

  fill(furyPercentage) {
    this.#furyValue = clamp(0, this.#furyValue + furyPercentage, 100);
    this.#updateFuryMeter();
  }

  unfill(furyPercentage) {
    this.#furyValue = clamp(0, this.#furyValue - furyPercentage, 100);
    this.#updateFuryMeter();
  }

  empty() {
    this.#furyValue = FuryMeterState.EMPTY;
    this.#updateFuryMeter();
  }

  isFull() {
    return this.#furyValue === FuryMeterState.FULL;
  }
}

export { FuryMeter };
