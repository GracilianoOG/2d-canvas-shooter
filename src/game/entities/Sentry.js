import { Timer } from "@/engine/systems/Timer";
import { PistolAmmo } from "../arsenal/ammo/PistolAmmo";
import { entityManager } from "../systems/EntityManager";
import { Entity } from "./Entity";
import { gameState } from "../core/GameState";

export class Sentry extends Entity {
  #target;
  #ammoType;
  #range;
  #cooldown;
  #despawnTimer;

  constructor(x, y, radius, color, range = 200, duration = 20_000) {
    super(x, y, radius, color);
    this.#target = null;
    this.#ammoType = new PistolAmmo();
    this.#range = range;
    this.#cooldown = new Timer(150, { loop: false });
    this.#despawnTimer = new Timer(duration, { autodestruct: true }, () =>
      this.destroy(),
    );
  }

  #shoot() {
    if (this.#cooldown.active) return;
    this.#cooldown.reset();
    const direction = this.angleTo({ x: this.#target.x, y: this.#target.y });
    this.#ammoType.create(this.x, this.y, direction);
    gameState.getEntity("gameAudio").play("shot");
  }

  #drawDespawnDelay(ctx) {
    const { waitTime: despawnDelay } = this.#despawnTimer;
    const { elapsedTime } = this.#despawnTimer;
    const timePerc = elapsedTime / despawnDelay;
    const padding = 3;

    this.drawArc(ctx, this.color, padding, timePerc);
  }

  #scanForTarget() {
    const enemies = entityManager.entities.filter((ent) => ent?.drop);

    for (const enemy of enemies) {
      if (this.distanceTo({ x: enemy.x, y: enemy.y }) <= this.#range) {
        this.#target = enemy;
        return;
      }
    }
  }

  draw(ctx) {
    super.draw(ctx);
    this.#drawDespawnDelay(ctx);
  }

  update() {
    if (this.#target) {
      const { x, y, destroyed } = this.#target;
      this.#shoot();

      if (!destroyed && this.distanceTo({ x, y }) <= this.#range) {
        return;
      }
      this.#target = null;
    }

    this.#scanForTarget();
  }
}
