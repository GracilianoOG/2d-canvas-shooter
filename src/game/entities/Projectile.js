import { config } from "../config/index.js";
import { Entity } from "./Entity.js";

class Projectile extends Entity {
  #speed;
  #angle;

  constructor(radius, speed, color, angle = 0) {
    super(radius, color);
    this.speed = speed;
    this.#angle = angle;
  }

  get speed() {
    return this.#speed;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  get angle() {
    return this.#angle;
  }

  set angle(angle) {
    this.#angle = angle;
  }

  bounce() {
    const axis = this.touchedBorder();

    if (axis) {
      this.getInCanvas(config);

      if (axis === "x") {
        this.angle = Math.PI - this.angle;
      } else if (axis === "y") {
        this.angle = -this.angle;
      }
    }

    return !!axis;
  }

  touchedBorder() {
    const { x: bx, y: by, radius: br } = this;
    const { width: cw, height: ch } = config;

    const X_AXIS = (bx < br || bx + br > cw) && "x";
    const Y_AXIS = (by < br || by + br > ch) && "y";

    return X_AXIS || Y_AXIS || null;
  }

  shrink(amount) {
    const newRadius = Math.max(this.radius - amount, 0);
    this.radius = newRadius;
    if (!newRadius) this.destroy();
  }

  grow(amount) {
    this.radius += amount;
  }
}

export { Projectile };
