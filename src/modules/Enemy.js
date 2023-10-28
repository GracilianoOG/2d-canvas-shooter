import { Circle } from "./Circle.js";

class Enemy extends Circle {
  #target;
  #speed;

  constructor(x, y, radius, speed, color, target) {
    super(x, y, radius, color);
    this.#speed = speed;
    this.#target = target;
  }

  move() {
    const targetCenterX = this.#target.x + this.#target.width / 2;
    const targetCenterY = this.#target.y + this.#target.height / 2;
    const dirX = targetCenterX - this.x;
    const dirY = targetCenterY - this.y;
    const angle = Math.atan2(dirY, dirX);
    if(Math.hypot(dirX, dirY) > this.#speed) {
      this.x += Math.cos(angle) * this.#speed;
      this.y += Math.sin(angle) * this.#speed;
    }
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

export { Enemy };