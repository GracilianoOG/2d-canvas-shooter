import { GRAY } from "./utils/constants/colors";
import { clamp, TAU } from "./utils/math";

class Entity {
  #position;
  #color;
  #radius;
  static instances = [];

  constructor(x, y, radius, color) {
    this.#position = { x, y };
    this.#color = color;
    this.#radius = radius;
    Entity.instances.push(this);
  }

  static updateAll(ctx, delta) {
    Entity.instances.sort((a, b) => b.dimensions.radius - a.dimensions.radius);
    for (let i = Entity.instances.length - 1; i >= 0; i--) {
      Entity.instances[i].draw(ctx);
      Entity.instances[i].update(delta);
    }
  }

  get x() {
    return this.#position.x;
  }

  set x(x) {
    this.#position.x = x;
  }

  get y() {
    return this.#position.y;
  }

  set y(y) {
    this.#position.y = y;
  }

  get color() {
    return this.#color;
  }

  set color(color) {
    this.#color = color;
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius) {
    this.#radius = radius;
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

  getInCanvas(canvas) {
    const { width, height } = canvas;
    const size = this.dimensions.radius;

    this.x = clamp(size, this.x, width - size);
    this.y = clamp(size, this.y, height - size);
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
