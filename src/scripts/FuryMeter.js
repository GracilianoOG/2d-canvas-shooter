import { eventManager } from "./singletons/EventManager";

const FuryMeterState = Object.freeze({
  EMPTY: 0,
  FULL: 100,
});

class FuryMeter {
  #furyMeterBar;
  #furyMeterFill;
  #furyLabel;
  #furyValue = FuryMeterState.EMPTY;

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

  #validateFury() {
    if (this.#furyValue > FuryMeterState.FULL) {
      this.#furyValue = FuryMeterState.FULL;
    } else if (this.#furyValue < FuryMeterState.EMPTY) {
      this.#furyValue = FuryMeterState.EMPTY;
    }
  }

  #updateFuryMeter() {
    this.#validateFury();

    this.#furyMeterFill.style.width = `${this.#furyValue}%`;

    if (this.#furyValue !== FuryMeterState.FULL) {
      this.#furyMeterBar.classList.remove("fury-meter--full");
      this.#furyMeterFill.classList.remove("fury-meter__fill--full");
    } else {
      this.#furyMeterBar.classList.add("fury-meter--full");
      this.#furyMeterFill.classList.add("fury-meter__fill--full");
    }
  }

  fill(furyPercentage) {
    this.#furyValue += furyPercentage;
    this.#updateFuryMeter();
  }

  unfill(furyPercentage) {
    this.#furyValue -= furyPercentage;
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
