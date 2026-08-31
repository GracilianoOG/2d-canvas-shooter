import { TAU } from "@/engine/utils/math";
import { Projectile } from "./Projectile";
import { config } from "../config";
import { GOLDEN } from "../constants/colors";

export class Orb extends Projectile {
  #entities;
  #events;
  #target;
  #state;

  constructor(data, entities, events) {
    super(6, 300, GOLDEN, Math.random() * TAU);
    // super(data.radius, data.speed, data.color);
    this.#entities = entities;
    this.#events = events;
    this.#state = "scatter";
    this.#target = this.#entities.get("player")[0];
  }

  #followTarget(delta) {
    const target = this.#target;
    const position = { x: target.x, y: target.y };
    this.angle = this.angleTo(position);
    this.moveTowards(delta);
    this.speed += delta * 800;
  }

  #deaccelerate(delta) {
    const DEACCELERATION = delta * 200;
    this.speed = Math.max(this.speed - DEACCELERATION, 0);
    this.moveTowards(delta);
    this.bounce();
  }

  #notify() {
    this.#events.emit("indicate", { x: this.x, y: this.y }, "100", this.color);
  }

  grab() {
    this.#notify();
    this.destroy();
  }

  update(delta) {
    switch (this.#state) {
      case "follow":
        this.#followTarget(delta);
        break;
      case "scatter":
        if (this.distanceTo({ x: this.#target.x, y: this.#target.y }) <= 100) {
          this.#state = "follow";
          return;
        }
        this.#deaccelerate(delta);
        break;
    }
  }
}
