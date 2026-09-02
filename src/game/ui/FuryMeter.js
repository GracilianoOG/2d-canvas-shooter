import { Bar } from "../../engine/ui/Bar";

export class FuryMeter extends Bar {
  #events;

  constructor(args, events) {
    super(args);
    this.#events = events;

    events.on("playerDeath", () => (this.value = 0));
    events.on("fillFuryMeter", (amount) => this.fill(amount));
    events.on("checkFuryMeterToFill", (furyItem) => {
      if (!this.isFull()) {
        this.fill(10);
        furyItem.collect();
      }
    });
    events.on("shouldActivateFury", this.#onFuryActivation.bind(this));
    events.on("emptyFuryMeter", this.#onEmptyFuryMeter.bind(this));
  }

  #onEmptyFuryMeter({ timePerc }) {
    this.value = timePerc * this.maxValue;
  }

  #onFuryActivation() {
    if (this.isFull()) {
      this.#events.emit("activateFury");
    }
  }
}
