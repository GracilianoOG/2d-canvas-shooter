const FuryMeterState = Object.freeze({
  EMPTY: 0,
  FULL: 100,
});

class FuryMeter {
  #furyMeterEl;
  #furyMeterFillEl;
  #fury = FuryMeterState.EMPTY;

  constructor() {
    this.#furyMeterEl = document.createElement("div");
    this.#furyMeterEl.classList.add("fury-meter");

    this.#furyMeterFillEl = document.createElement("div");
    this.#furyMeterFillEl.classList.add("fury-meter__fill");

    this.#furyMeterEl.append(this.#furyMeterFillEl);

    document.querySelector("#hud").append(this.#furyMeterEl);
  }

  #validateFury() {
    if (this.#fury > FuryMeterState.FULL) {
      this.#fury = FuryMeterState.FULL;
    } else if (this.#fury < FuryMeterState.EMPTY) {
      this.#fury = FuryMeterState.EMPTY;
    }
  }

  #updateFuryMeter() {
    this.#furyMeterFillEl.style.width = `${this.#fury}%`;

    if (this.#fury === FuryMeterState.FULL) {
      this.#furyMeterEl.style.borderColor = "gold";
      this.#furyMeterEl.style.boxShadow = "0 0 8px gold";
      this.#furyMeterFillEl.style.backgroundColor = "gold";
    } else {
      this.#furyMeterEl.style.borderColor = "";
      this.#furyMeterEl.style.boxShadow = "";
      this.#furyMeterFillEl.style.backgroundColor = "";
    }
  }

  fill(furyPercentage) {
    this.#fury += furyPercentage;
    this.#validateFury();
    this.#updateFuryMeter();
  }

  unfill(furyPercentage) {
    this.#fury -= furyPercentage;
    this.#validateFury();
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
