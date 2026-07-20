import { eventManager } from "../../engine/systems/EventManager";
import { Bar } from "../../engine/ui/Bar";

export class FuryMeter extends Bar {
  constructor(args) {
    super(args);

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
    this.value = timePerc * this.maxValue;
  }

  #onFuryActivation() {
    if (this.isFull()) {
      eventManager.emit("activateFury");
    }
  }
}
