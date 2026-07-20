import { clamp } from "@/engine/utils/math";

export class Bar {
  #meterBar;
  #meterFill;
  #label;
  #value;
  #maxValue;

  constructor({ container, label = "", value = 0, initial = 0 }) {
    this.#meterBar = document.createElement("div");
    this.#meterBar.classList.add("bar");

    this.#meterFill = document.createElement("div");
    this.#meterFill.classList.add("bar__fill");

    this.#label = document.createElement("span");
    this.#label.classList.add("bar__label");
    this.#label.textContent = label;

    this.#meterBar.append(this.#meterFill);
    this.#meterBar.append(this.#label);

    container.append(this.#meterBar);

    this.#maxValue = value;
    this.value = initial;
  }

  get maxValue() {
    return this.#maxValue;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = clamp(0, value, this.#maxValue);
    this.#meterFill.style.width = `${(this.#value / this.#maxValue) * 100}%`;

    this.#meterBar.classList.toggle("bar--full", this.isFull());
    this.#meterFill.classList.toggle("bar__fill--full", this.isFull());
  }

  fill(amount) {
    this.value += amount;
  }

  isFull() {
    return this.value === this.#maxValue;
  }
}
