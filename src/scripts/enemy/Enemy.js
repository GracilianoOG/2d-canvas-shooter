import { dropRandomItem } from "../items/itemDrop.js";
import { Particle } from "../Particle.js";
import { Projectile } from "../Projectile.js";
import { eventManager } from "../singletons/EventManager.js";
import { WHITE } from "../utils/constants/colors.js";
import { EnemyAI } from "./EnemyAI";
import { defaultStats } from "./enemyDefaultStats.js";

class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #baseColor;
  #score;
  #ai;
  #options;

  constructor(x, y, radius, speed, color, health, score, target, options = {}) {
    super(x, y, radius, speed, color);
    this.#target = target;
    this.#health = health;
    this.#maxSpeed = speed;
    this.#baseColor = color;
    this.#score = score;
    this.#ai = new EnemyAI(this);
    this.#options = { ...defaultStats, ...options };
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

  #move(delta) {
    this.#ai.followTarget(this.#target, delta);
  }

  #increaseSpeed(increase) {
    if (this.speed < this.#maxSpeed) {
      this.speed = Math.min(this.speed + increase, this.#maxSpeed);
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
    eventManager.emit("enemyHit", {
      score: this.score.hit,
      color: this.baseColor,
    });
  }

  drop(chance) {
    dropRandomItem(this.x, this.y, chance);
  }

  #createDamageEffect() {
    if (this.#options.knockback) {
      this.speed = -62;
    }
    if (this.#options.aggressive) {
      this.#maxSpeed += 62;
    }
    if (this.#options.shrinkable) {
      this.dimensions = { radius: Math.round(this.dimensions.radius * 0.9) };
    }
    this.color = WHITE;
  }

  #bleed(amount) {
    Particle.createParticles(this.x, this.y, 8, 313, this.baseColor, amount);
  }

  #die() {
    this.#bleed(this.#options.bloodAmount * 2);
    eventManager.emit("enemyDeath", {
      score: this.score.death,
      color: this.baseColor,
    });
    this.destroy();
  }

  onDestroy() {
    this.drop(0.1);
  }

  update(delta) {
    this.#move(delta);
    this.#increaseSpeed(delta * 390);
    this.#returnOriginalColor();
  }
}

export { Enemy };
