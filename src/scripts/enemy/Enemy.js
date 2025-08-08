import { Particle } from "../Particle.js";
import { Projectile } from "../Projectile.js";
import { gameState } from "../singletons/GameState.js";
import { eventManager } from "../singletons/EventManager.js";
import { WHITE } from "../utils/constants/colors.js";

const defaultOptions = {
  knockback: true,
  aggressive: true,
  shrinkable: true,
  bloodAmount: 8,
};

class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #baseColor;
  #score;
  #delta;
  #options;

  constructor(x, y, radius, speed, color, health, score, target, options = {}) {
    super(x, y, radius, speed, color);
    this.#target = target;
    this.#health = health;
    this.#maxSpeed = speed;
    this.#baseColor = color;
    this.#score = score;
    this.#options = { ...defaultOptions, ...options };
  }

  get baseColor() {
    return this.#baseColor;
  }

  get score() {
    return this.#score;
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
    if (Math.hypot(dirX, dirY) > this.speed) {
      this.x += Math.cos(angle) * this.speed * this.#delta;
      this.y += Math.sin(angle) * this.speed * this.#delta;
    }
  }

  #increaseSpeed() {
    if (this.speed < this.#maxSpeed) {
      this.speed = Math.min(this.speed + 0.1, this.#maxSpeed);
    }
  }

  #returnOriginalColor() {
    if (this.color != this.#baseColor && this.speed > 0) {
      this.color = this.#baseColor;
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.#die();
      return this.#score.death;
    }
    this.#bleed(this.#options.bloodAmount);
    this.#createDamageEffect();
    gameState.getEntity("gameAudio").playSound("hit");
    return this.#score.hit;
  }

  #createDamageEffect() {
    if (this.#options.knockback) {
      this.speed = -1;
    }
    if (this.#options.aggressive) {
      this.#maxSpeed += 1;
    }
    if (this.#options.shrinkable) {
      this.dimensions = { radius: Math.round(this.dimensions.radius * 0.9) };
    }
    this.color = WHITE;
  }

  #bleed(amount) {
    Particle.createParticles(this.x, this.y, 8, 5, this.baseColor, amount);
  }

  #die() {
    this.#bleed(this.#options.bloodAmount * 2);
    eventManager.emit("enemyDeath");
    this.destroy();
  }

  update(delta) {
    this.#delta = delta;
    this.#followPlayer();
    this.#increaseSpeed();
    this.#returnOriginalColor();
  }
}

export { Enemy };
