import { Circle } from "./Circle.js";

class Projectile extends Circle {
  #speed;
  #angle;
  #hasCollided = false;

  constructor(x, y, radius, speed, angle, color) {
    super(x, y, radius, color);
    this.#speed = speed;
    this.#angle = angle;
  }

  set speed(speed) {
    this.#speed = speed;
  }

  set angle(angle) {
    this.#angle = angle;
  }

  set hasCollided(hasCollided) {
    this.#hasCollided = hasCollided;
  }

  get speed() {
    return this.#speed;
  }

  get angle() {
    return this.#angle;
  }

  get hasCollided() {
    return this.#hasCollided;
  }

  move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

export { Projectile };