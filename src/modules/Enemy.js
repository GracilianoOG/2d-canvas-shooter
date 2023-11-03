import { Particle } from "./Particle.js";
import { Projectile } from "./Projectile.js";

class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #mainColor;

  constructor(x, y, radius, speed, color, health, target) {
    super(x, y, radius, speed, color);
    this.#target = target;
    this.#health = health;
    this.#maxSpeed = speed;
    this.#mainColor = color;
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
      this.toDestroy = true;
    }
    this.speed = -1;
    this.radius = this.radius * .9;
    this.color = "#fff";
  }

  bleed(amount, size, speed) {
    const particles = [];

    for(let i = 0; i < amount; i++) {
      particles.push(new Particle(this.x, this.y, size, speed, this.#mainColor));
    }

    return particles;
  }

  #followPlayer() {
    const dirX = this.#target.center.x - this.x;
    const dirY = this.#target.center.y - this.y;
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
    if(this.color != this.#mainColor && this.speed > 0) {
      this.color = this.#mainColor;
    }
  }

  move() {
    this.#followPlayer();
    this.#increaseSpeed();
    this.#returnOriginalColor();
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

export { Enemy };