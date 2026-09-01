import { TAU } from "@/engine/utils/math";
import { Projectile } from "./Projectile";

export class Orb extends Projectile {
  #events;
  #target;
  #state;
  #range;
  #value;
  #type;
  #text;

  constructor(data, entities, events) {
    super(data.radius, data.speed, data.color, Math.random() * TAU);
    this.#events = events;
    this.#state = "scatter";
    this.#range = data.range;
    this.#value = data.value;
    this.#type = data.type;
    this.#text = data?.text ?? data.value;
    this.#target = entities.get("player")[0];
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
    this.#events.emit(
      "indicate",
      {
        x: this.x,
        y: this.y,
      },
      this.#text,
      this.color,
    );
  }

  grab() {
    this.#notify();

    switch (this.#type) {
      case "score":
        this.#events.emit("addScore", this.#value);
        break;
      case "energy":
        this.#events.emit("fillFuryMeter", { amount: this.#value });
        break;
    }

    this.destroy();
  }

  update(delta) {
    switch (this.#state) {
      case "follow":
        this.#followTarget(delta);
        break;
      case "scatter":
        if (
          this.distanceTo({ x: this.#target.x, y: this.#target.y }) <=
          this.#range
        ) {
          this.#state = "follow";
          return;
        }
        this.#deaccelerate(delta);
        break;
    }
  }
}
