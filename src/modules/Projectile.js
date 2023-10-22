import { Circle } from "./Circle.js";

class Projectile extends Circle {
  constructor(x, y, radius, speed, angle, color) {
    super(x, y, radius, color);
    this.speed = speed;
    this.angle = angle;
    this.hasCollided = false;
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