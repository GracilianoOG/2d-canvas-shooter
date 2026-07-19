import { GRAY } from "../utils/constants/colors";
import { clamp, TAU } from "../utils/math";

class Entity {
  #position;
  #color;
  #radius;
  #destroyed;

  constructor(x, y, radius, color) {
    this.#position = { x, y };
    this.#color = color;
    this.#radius = radius;
    this.#destroyed = false;
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

  get destroyed() {
    return this.#destroyed;
  }

  onDestroy() {}

  destroy() {
    this.onDestroy();
    this.#destroyed = true;
  }

  onCollision() {}

  collidedWith(object) {
    const hasCollided =
      Math.hypot(this.x - object.x, this.y - object.y) <
      this.#radius + object.radius;

    if (hasCollided) {
      this.onCollision(object);
    }

    return hasCollided;
  }

  getInCanvas(canvas) {
    const { width, height } = canvas;
    const size = this.radius;

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
    const size = this.radius + padding;

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
