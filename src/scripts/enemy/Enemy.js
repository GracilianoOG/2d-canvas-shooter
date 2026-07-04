import { Adrenaline } from "../items/Adrenaline.js";
import { Life } from "../items/Life.js";
import { Shield } from "../items/Shield.js";
import { WeaponBox } from "../items/WeaponBox.js";
import { Particle } from "../Particle.js";
import { Projectile } from "../Projectile.js";
import { eventManager } from "../singletons/EventManager.js";
import { WHITE } from "../utils/constants/colors.js";
import { EnemyAI } from "./EnemyAI";

const defaultOptions = Object.freeze({
  knockback: true,
  aggressive: true,
  shrinkable: true,
  bloodAmount: 8,
});

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

  #move(delta) {
    this.#ai.followTarget(this.#target, delta);
  }

  #increaseSpeed() {
    if (this.speed < this.#maxSpeed) {
      this.speed = Math.min(this.speed + 6.25, this.#maxSpeed);
    }
  }

  #returnOriginalColor() {
    if (this.color != this.#baseColor && this.speed > 0) {
      this.color = this.#baseColor;
    }
  }

  #dropItem() {
    const dropChance = 0.08;

    if (Math.random() >= dropChance) {
      return;
    }

    const chances = [10, 30, 60, 100];
    const items = [
      () => new Life(this.x, this.y),
      () => new Shield(this.x, this.y),
      () => new Adrenaline(this.x, this.y),
      () => new WeaponBox(this.x, this.y),
    ];
    const totalChance = chances.reduce((sum, acc) => sum + acc, 0);
    const randChance = Math.floor(totalChance * Math.random());

    for (let i = 0, currChance = 0, len = chances.length; i < len; i++) {
      currChance += chances[i];

      if (currChance >= randChance) {
        items[i]();
        return;
      }
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
    Particle.createParticles(this.x, this.y, 8, 5, this.baseColor, amount);
  }

  #die() {
    this.#bleed(this.#options.bloodAmount * 2);
    eventManager.emit("enemyDeath", {
      score: this.score.death,
      color: this.baseColor,
    });
    this.#dropItem();
    this.destroy();
  }

  update(delta) {
    this.#move(delta);
    this.#increaseSpeed();
    this.#returnOriginalColor();
  }
}

export { Enemy };
