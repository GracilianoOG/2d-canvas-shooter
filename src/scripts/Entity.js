import { GRAY } from "./utils/constants/colors";
import { TAU } from "./utils/math";

class Entity {
  #x;
  #y;
  #color;
  #radius;
  static instances = [];

  constructor(x, y, radius, color) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#radius = radius;
    Entity.instances.push(this);
  }

  /**
   * The update loop goes from end to beginning because if an instance is destroyed, the position stays the same.
   *
   * This avoids the access of a nonexistent instance in the instances array and avoids creating a new clone of the array.
   *
   * The following example showcases a working loop that creates a copy of the instances array and then loops over the copy:
   *
   * @example
   * const currInstances = [...Entity.instances];
   * for (let i = 0, len = Entity.instances.length; i < len; i++) {
   *  currInstances[i].draw(ctx);
   *  currInstances[i].update(delta);
   *}
   */
  static updateAll(ctx, delta) {
    Entity.instances.sort((a, b) => b.dimensions.radius - a.dimensions.radius);
    for (let i = Entity.instances.length - 1; i >= 0; i--) {
      Entity.instances[i].draw(ctx);
      Entity.instances[i].update(delta);
    }
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
  }

  get color() {
    return this.#color;
  }

  set color(color) {
    this.#color = color;
  }

  get dimensions() {
    return { radius: this.#radius };
  }

  set dimensions({ radius }) {
    this.#radius = radius;
  }

  onDestroy() {}

  destroy() {
    this.onDestroy();
    Entity.instances = Entity.instances.filter((instance) => {
      return instance !== this;
    });
  }

  collidedWith(object) {
    return (
      Math.hypot(this.x - object.x, this.y - object.y) <
      this.#radius + object.dimensions.radius
    );
  }

  draw(ctx) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.#color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  drawArc(ctx, color, padding, percent, drawEmpty = false) {
    const size = this.dimensions.radius + padding;

    ctx.shadowBlur = 10;
    ctx.shadowColor = color;

    if (drawEmpty) {
      ctx.strokeStyle = GRAY;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size, TAU * percent, 0);
      ctx.stroke();
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, TAU * percent);
    ctx.stroke();

    ctx.shadowBlur = 0;
  }

  update() {}
}

export { Entity };
