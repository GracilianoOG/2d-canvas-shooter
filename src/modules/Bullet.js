import { Projectile } from "./Projectile.js";

class Bullet extends Projectile {
  #angle;

  constructor(x, y, radius, speed, angle, color) {
    super(x, y, radius, speed, color);
    this.#angle = angle;
  }

  set angle(angle) {
    this.#angle = angle;
  }

  get angle() {
    return this.#angle;
  }

  isOutOfCanvas(canvas) {
    const { x: bx, y: by, radius: br } = this;
    const { width: cw, height: ch } = canvas;
    return bx < -br || bx > cw + br || by < -br || by > ch + br;
  }

  #move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  update(ctx) {
    this.draw(ctx);
    this.#move();
  }
}

export { Bullet };