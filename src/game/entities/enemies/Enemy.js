import { entityManager } from "../../systems/EntityManager";
import { dropRandomItem } from "../../items/itemDrop";
import { Particle } from "../Particle";
import { Projectile } from "../Projectile";
import { eventManager } from "../../../engine/systems/EventManager";
import { WHITE } from "../../constants/colors";
import { defaultStats } from "../../enemy/enemyDefaultStats";
import { Layers } from "@/game/constants/layers";

export class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #baseColor;
  #score;
  #options;

  constructor({ radius, speed, color, hp, score, options }) {
    super(radius, speed, color);
    this.#health = hp;
    this.#maxSpeed = speed;
    this.#baseColor = color;
    this.#score = score;
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

  #followTarget(delta) {
    const target = this.#target;
    const position = { x: target.x, y: target.y };
    const angle = this.angleTo(position);
    if (this.distanceTo(position) > target.radius) {
      this.x += Math.cos(angle) * this.speed * delta;
      this.y += Math.sin(angle) * this.speed * delta;
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
      this.shrink(1);
    }
    this.color = WHITE;
  }

  #bleed(amount) {
    Particle.create(this.x, this.y, 8, 313, this.baseColor, amount);
  }

  #die() {
    eventManager.emit("enemyDeath");
    this.destroy();
  }

  target(target) {
    this.#target = target;
    return this;
  }

  takeDamage(damage) {
    this.health -= damage;
    const alive = this.health > 0;
    eventManager.emit("audio", alive ? "hit" : "explosion");
    eventManager.emit("enemyHit", {
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
    const item = dropRandomItem(chance);
    if (!item) return;
    entityManager.add(this.x, this.y, item, Layers.ITEMS);
  }

  onDestroy() {
    this.drop(0.1);
  }

  update(delta) {
    this.#followTarget(delta);
    this.#increaseSpeed(delta * 390);
    this.#returnOriginalColor();
  }
}
