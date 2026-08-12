import { inputManager } from "@/engine/systems/InputManager";
import { eventManager } from "../../engine/systems/EventManager";
import { Timer } from "../../engine/systems/Timer";

export class Fury {
  #timer;
  #isActive;
  #duration;

  constructor(duration = 5000) {
    this.#timer = Timer.create(
      duration,
      { autostart: false },
      this.deactivate.bind(this),
    );
    this.#isActive = false;
    this.#duration = duration;
    eventManager.on("activateFury", () => this.activate());
    eventManager.on("playerDeath", this.deactivate.bind(this));
    eventManager.on("enemyDeath", this.#onEnemyKilled.bind(this));
    eventManager.on("furyPickup", (furyItem) => {
      if (!this.isActive()) {
        eventManager.emit("checkFuryMeterToFill", furyItem);
      }
    });
  }

  #onEnemyKilled() {
    if (!this.isActive()) {
      eventManager.emit("fillFuryMeter", { amount: 4 });
    }
  }

  activate() {
    if (this.isActive()) return;
    this.#timer.reset();
    this.#isActive = true;
    eventManager.emit("activatedFury");
  }

  deactivate() {
    if (!this.isActive()) return;
    this.#timer.stop();
    this.#isActive = false;
    eventManager.emit("deactivateFury");
  }

  isActive() {
    return this.#isActive;
  }

  update(_delta) {
    if (this.isActive()) {
      const elapsedTime = this.#timer.elapsedTime;
      const furyDelay = this.#duration;
      const timePerc = elapsedTime / furyDelay;
      eventManager.emit("emptyFuryMeter", { timePerc });
    }
    if (inputManager.isActionPressed("fury")) {
      eventManager.emit("shouldActivateFury");
    }
  }
}
