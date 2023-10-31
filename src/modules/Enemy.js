import { Projectile } from "./Projectile.js";

class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;

  constructor(x, y, radius, speed, color, health, target) {
    super(x, y, radius, speed, color);
    this.#target = target;
    this.#health = health;
    this.#maxSpeed = speed;
  }

  set health(health) {
    this.#health = health;
  }

  get health() {
    return this.#health;
  }

  takeDamage(damage) {
    this.health -= damage;
    if(this.health <= 0) {
      this.hasCollided = true;
    }
    this.speed = -1;
    this.radius = this.radius * .9;
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