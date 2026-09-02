import { dropRandomItem } from "../../items/itemDrop";
import { Projectile } from "../Projectile";
import { WHITE } from "../../constants/colors";
import { defaultStats } from "../../enemy/enemyDefaultStats";
import { randomInt } from "@/engine/utils/math";
import { Timer } from "@/engine/systems/Timer";
import {
  AGRESSIVENESS_BUFF,
  GROWTH_RATE,
  KNOCKBACK_FORCE,
  SHRINKAGE_RATE,
} from "@/game/constants/hitEffects";

export class Enemy extends Projectile {
  #target;
  #maxSpeed;
  #health;
  #baseColor;
  #score;
  #options;
  #dropChance;
  #events;
  #orbs;
  #colorTimer;

  constructor(enemyData, target, events) {
    const { radius, speed, color, hp, score, options, dropChance, orbs } =
      enemyData;
    super(radius, speed, color);
    this.#health = hp;
    this.#maxSpeed = speed;
    this.#baseColor = color;
    this.#score = score;
    this.#dropChance = dropChance;
    this.#target = target;
    this.#events = events;
    this.#orbs = orbs;
    this.#options = { ...defaultStats, ...options };
    this.#colorTimer = Timer.create(
      250,
      { autostart: false },
      () => (this.color = this.baseColor),
    );
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

  #chaseTarget(delta) {
    const target = this.#target;
    const position = { x: target.x, y: target.y };

    if (this.distanceTo(position) > target.radius) {
      this.angle = this.angleTo(position);
      this.moveTowards(delta);
    }
  }

  #increaseSpeed(increase) {
    if (this.speed < this.#maxSpeed) {
      this.speed = Math.min(this.speed + increase, this.#maxSpeed);
    }
  }

  #createDamageEffect() {
    if (this.#options.knockback) {
      this.speed = -KNOCKBACK_FORCE;
    }
    if (this.#options.aggressive) {
      this.#maxSpeed += AGRESSIVENESS_BUFF;
    }
    if (this.#options.shrinkable) {
      this.shrink(this.radius * SHRINKAGE_RATE);
    }
    if (this.#options.grow) {
      this.grow(this.radius * GROWTH_RATE);
    }
    this.color = WHITE;
    this.#colorTimer.start();
  }

  #bleed(amount) {
    this.#events.emit("spawnParticles", this.x, this.y, amount, this.baseColor);
  }

  #die() {
    this.#events.emit("enemyDeath");
    this.#events.emit("spawnOrbs", this.x, this.y, randomInt(this.#orbs + 1));
    this.#colorTimer.remove();
    this.drop(this.#dropChance);
    this.destroy();
  }

  #isAlive() {
    return this.health > 0;
  }

  takeDamage(damage) {
    this.health -= damage;
    const alive = this.#isAlive();
    this.#events.emit("audio", alive ? "hit" : "explosion");
    this.#events.emit(
      "score",
      { x: this.x, y: this.y },
      alive ? this.score : this.score * 3,
      this.baseColor,
    );
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
    this.#chaseTarget(delta);
    this.#increaseSpeed(delta * 390);
  }
}
