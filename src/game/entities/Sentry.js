import { Timer } from "@/engine/systems/Timer";
import { Entity } from "./Entity";
import { eventManager } from "@/engine/systems/EventManager";
import { AmmoFactory } from "../arsenal/ammo/AmmoFactory";
import { sentryData } from "@/data/sentryData";
import { SentryStates } from "../constants/states";
import { Layers } from "../constants/layers";

export class Sentry extends Entity {
  #target;
  #ammoType;
  #range;
  #cooldown;
  #despawnTimer;
  #state;
  #entities;

  constructor(entities) {
    const { radius, color, range, duration } = sentryData;
    super(radius, color);
    this.#state = SentryStates.SCAN;
    this.#target = null;
    this.#ammoType = AmmoFactory.request("common");
    this.#range = range;
    this.#entities = entities;
    this.#cooldown = Timer.create(150);
    this.#despawnTimer = Timer.create(duration, { autodestruct: true }, () => {
      this.#cooldown.remove();
      this.destroy();
    });
  }

  #shoot() {
    this.#cooldown.reset();
    this.#state = SentryStates.WAIT;
    const direction = this.angleTo({ x: this.#target.x, y: this.#target.y });
    this.#ammoType.create(this.x, this.y, direction);
    eventManager.emit("audio", "shot");
  }

  #drawDespawnDelay(ctx) {
    const padding = 3;
    this.drawArc(ctx, this.color, padding, this.#despawnTimer.timeLeft());
  }

  #scanForTarget() {
    for (const enemy of this.#entities.get(Layers.ENEMIES)) {
      if (this.distanceTo({ x: enemy.x, y: enemy.y }) <= this.#range) {
        this.#target = enemy;
        this.#state = SentryStates.WAIT;
        return;
      }
    }
  }

  #targetInRange() {
    const { x, y, destroyed } = this.#target;
    return !destroyed && this.distanceTo({ x, y }) <= this.#range;
  }

  draw(ctx) {
    super.draw(ctx);
    this.#drawDespawnDelay(ctx);
  }

  update() {
    switch (this.#state) {
      case SentryStates.SHOOT:
        this.#shoot();
        break;
      case SentryStates.WAIT:
        if (!this.#targetInRange()) {
          this.#state = SentryStates.SCAN;
        } else if (!this.#cooldown.active) {
          this.#state = SentryStates.SHOOT;
        }
        break;
      case SentryStates.SCAN:
        this.#scanForTarget();
        break;
    }
  }
}
