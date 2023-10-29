import { Projectile } from "./Projectile.js";

class Enemy extends Projectile {
  #target;
  #maxSpeed;

  constructor(x, y, radius, speed, color, target) {
    super(x, y, radius, speed, color);
    this.#target = target;
    this.#maxSpeed = speed;
  }

  move() {
    const dirX = this.#target.center.x - this.x;
    const dirY = this.#target.center.y - this.y;
    const angle = Math.atan2(dirY, dirX);
    if(Math.hypot(dirX, dirY) > this.speed) {
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;
    }
    if(this.speed < this.#maxSpeed) {
      this.speed += .1;
    }
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

export { Enemy };