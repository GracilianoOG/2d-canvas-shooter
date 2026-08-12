import { eventManager } from "../../engine/systems/EventManager";
import { Bar } from "../../engine/ui/Bar";

export class FuryMeter extends Bar {
  constructor(args) {
    super(args);

    eventManager.on("restart", () => (this.value = 0));
    eventManager.on("fillFuryMeter", ({ amount }) => this.fill(amount));
    eventManager.on("checkFuryMeterToFill", (furyItem) => {
      if (!this.isFull()) {
        this.fill(10);
        furyItem.collect();
      }
    });
    eventManager.on("shouldActivateFury", this.#onFuryActivation.bind(this));
    eventManager.on("emptyFuryMeter", this.#onEmptyFuryMeter.bind(this));
  }

  #onEmptyFuryMeter({ timePerc }) {
    this.value = timePerc * this.maxValue;
  }

  #onFuryActivation() {
    if (this.isFull()) {
      eventManager.emit("activateFury");
    }
  }
}
