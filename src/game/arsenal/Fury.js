import { Timer } from "../../engine/systems/Timer";

export class Fury {
  #timer;
  #isActive;
  #duration;
  #events;
  #input;

  constructor(events, input, duration = 5000) {
    this.#events = events;
    this.#input = input;

    this.#timer = Timer.create(
      duration,
      { autostart: false },
      this.deactivate.bind(this),
    );
    this.#isActive = false;
    this.#duration = duration;
    events.on("activateFury", () => this.activate());
    events.on("playerDeath", this.deactivate.bind(this));
    events.on("enemyDeath", this.#onEnemyKilled.bind(this));
    events.on("furyPickup", (furyItem) => {
      if (!this.isActive()) {
        events.emit("checkFuryMeterToFill", furyItem);
      }
    });
  }

  #onEnemyKilled() {
    if (!this.isActive()) {
      this.#events.emit("fillFuryMeter", { amount: 4 });
    }
  }

  activate() {
    if (this.isActive()) return;
    this.#timer.reset();
    this.#isActive = true;
    this.#events.emit("activatedFury");
  }

  deactivate() {
    if (!this.isActive()) return;
    this.#timer.stop();
    this.#isActive = false;
    this.#events.emit("deactivateFury");
  }

  isActive() {
    return this.#isActive;
  }

  update(_delta) {
    if (this.isActive()) {
      const elapsedTime = this.#timer.elapsedTime;
      const furyDelay = this.#duration;
      const timePerc = elapsedTime / furyDelay;
      this.#events.emit("emptyFuryMeter", { timePerc });
    }
    if (this.#input.isActionPressed("fury")) {
      this.#events.emit("shouldActivateFury");
    }
  }
}
