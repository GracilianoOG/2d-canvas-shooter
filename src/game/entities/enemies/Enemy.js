import { dropRandomItem } from "../../items/itemDrop";
import { Projectile } from "../Projectile";
import { WHITE } from "../../constants/colors";
import { defaultStats } from "../../enemy/enemyDefaultStats";
import { randomInt } from "@/engine/utils/math";

export class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #baseColor;
  #score;
  #options;
  #dropChance;
  #events;

  constructor(enemyData, target, events) {
    const { radius, speed, color, hp, score, options, dropChance } = enemyData;
    super(radius, speed, color);
    this.#health = hp;
    this.#maxSpeed = speed;
    this.#baseColor = color;
    this.#score = score;
    this.#dropChance = dropChance;
    this.#target = target;
    this.#events = events;
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

  get target() {
    return this.#target;
  }

  get events() {
    return this.#events;
  }

  #followTarget(delta) {
    const target = this.#target;
    const position = { x: target.x, y: target.y };

    this.angle = this.angleTo(position);

    if (this.distanceTo(position) > target.radius) {
      this.moveTowards(delta);
    }
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

  #createDamageEffect() {
    if (this.#options.knockback) {
      this.speed = -62;
    }
    if (this.#options.aggressive) {
      this.#maxSpeed += 62;
    }
    if (this.#options.shrinkable) {
      this.shrink(this.radius * 0.05);
    }
    if (this.#options.grow) {
      this.grow(this.radius * 0.02);
    }
    this.color = WHITE;
  }

  #bleed(amount) {
    this.#events.emit("spawnParticles", this.x, this.y, amount, this.baseColor);
  }

  #die() {
    this.#events.emit("enemyDeath");
    this.#events.emit("spawnOrbs", this.x, this.y, randomInt(7));
    this.drop(this.#dropChance);
    this.destroy();
  }

  takeDamage(damage) {
    this.health -= damage;
    const alive = this.health > 0;
    this.#events.emit("audio", alive ? "hit" : "explosion");
    this.#events.emit("enemyHit", {
      color: this.baseColor,
      position: { x: this.x, y: this.y },
      score: alive ? this.score : this.score * 3,
    });
    this.#bleed(this.#options.bloodAmount * (Number(!alive) + 1));
    if (this.health <= 0) {
      this.#die();
      return;
    }
    this.#createDamageEffect();
  }

  drop(chance) {
    const item = dropRandomItem(chance, this.#events);
    if (item) {
      this.#events.emit("drop", this.x, this.y, item);
    }
  }

  update(delta) {
    this.#followTarget(delta);
    this.#increaseSpeed(delta * 390);
    this.#returnOriginalColor();
  }
}
