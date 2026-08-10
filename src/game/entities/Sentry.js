import { Timer } from "@/engine/systems/Timer";
import { entityManager } from "../systems/EntityManager";
import { Entity } from "./Entity";
import { eventManager } from "@/engine/systems/EventManager";
import { AmmoFactory } from "../arsenal/ammo/AmmoFactory";
import { Layers } from "../constants/layers";

export class Sentry extends Entity {
  #target;
  #ammoType;
  #range;
  #cooldown;
  #despawnTimer;

  constructor(x, y, radius, color, range = 250, duration = 20_000) {
    super(x, y, radius, color);
    this.#target = null;
    this.#ammoType = AmmoFactory.request("common");
    this.#range = range;
    this.#cooldown = Timer.create(150);
    this.#despawnTimer = Timer.create(duration, { autodestruct: true }, () => {
      this.#cooldown.remove();
      this.destroy();
    });
  }

  #shoot() {
    if (this.#cooldown.active) return;
    this.#cooldown.reset();
    const direction = this.angleTo({ x: this.#target.x, y: this.#target.y });
    this.#ammoType.create(this.x, this.y, direction);
    eventManager.emit("audio", "shot");
  }

  #drawDespawnDelay(ctx) {
    const padding = 3;
    this.drawArc(ctx, this.color, padding, this.#despawnTimer.timeLeft());
  }

  #scanForTarget() {
    for (const enemy of entityManager.get(Layers.ENEMIES)) {
      if (this.distanceTo({ x: enemy.x, y: enemy.y }) <= this.#range) {
        this.#target = enemy;
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
    if (this.#target) {
      this.#shoot();

      if (this.#targetInRange()) {
        return;
      }

      this.#target = null;
    }

    this.#scanForTarget();
  }
}
