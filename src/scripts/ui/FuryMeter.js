import { eventManager } from "../systems/EventManager";
import { clamp } from "../engine/utils/math";

const MAX_FURY_VALUE = 100;

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
    eventManager.subscribe("checkFuryMeterToFill", ({ collect, amount }) => {
      if (!this.isFull()) {
        this.fill(amount);
        collect();
      }
    });
    eventManager.subscribe(
      "shouldActivateFury",
      this.#onFuryActivation.bind(this),
    );
    eventManager.subscribe("emptyFuryMeter", this.#onEmptyFuryMeter.bind(this));
  }

  #onEmptyFuryMeter({ timePerc }) {
    this.#furyValue = timePerc * MAX_FURY_VALUE;
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
    this.#furyMeterBar.classList.toggle(
      "fury-meter--filling",
      this.isFilling(),
    );
    this.#furyMeterFill.classList.toggle(
      "fury-meter__fill--full",
      this.isFull(),
    );
  }

  fill(value) {
    this.#furyValue = clamp(0, this.#furyValue + value, MAX_FURY_VALUE);
    this.#updateFuryMeter();
  }

  unfill(value) {
    this.#furyValue = clamp(0, this.#furyValue - value, MAX_FURY_VALUE);
    this.#updateFuryMeter();
  }

  empty() {
    this.#furyValue = 0;
    this.#updateFuryMeter();
  }

  isFilling() {
    return this.#furyValue > 0 && this.#furyValue < this.isFull();
  }

  isFull() {
    return this.#furyValue === MAX_FURY_VALUE;
  }
}

export { FuryMeter };
