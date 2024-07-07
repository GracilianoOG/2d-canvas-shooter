import { COLORS } from "../utils/constants.js";
import { Projectile } from "./Projectile.js";

class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #baseColor;

  constructor(x, y, radius, speed, color, health, target) {
    super(x, y, radius, speed, color);
    this.#target = target;
    this.#health = health;
    this.#maxSpeed = speed;
    this.#baseColor = color;
  }

  get baseColor() {
    return this.#baseColor;
  }

  get health() {
    return this.#health;
  }

  set health(health) {
    this.#health = health;
  }

  #followPlayer() {
    const dirX = this.#target.x - this.x;
    const dirY = this.#target.y - this.y;
    const angle = Math.atan2(dirY, dirX);
    if(Math.hypot(dirX, dirY) > this.speed) {
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;
    }
  }

  #increaseSpeed() {
    if(this.speed < this.#maxSpeed) {
      this.speed += .1;
      if(this.speed > this.#maxSpeed) {
        this.speed = this.#maxSpeed;
      }
    }
  }

  #returnOriginalColor() {
    if(this.color != this.#baseColor && this.speed > 0) {
      this.color = this.#baseColor;
    }
  }

  #move() {
    this.#followPlayer();
    this.#increaseSpeed();
    this.#returnOriginalColor();
  }

  takeDamage(damage) {
    this.health -= damage;
    if(this.health <= 0) {
      this.toDestroy = true;
    }
    this.speed = -1;
    this.radius = this.radius * .9;
    this.color = COLORS.WHITE;
  }

  update(ctx) {
    this.draw(ctx);
    this.#move();
  }
}

export { Enemy };