import { Particle } from "./Particle";
import { PlayerController } from "../player/PlayerController";
import { Projectile } from "./Projectile";
import { gameState } from "../core/GameState";
import { Fury } from "../arsenal/Fury";
import { eventManager } from "../../engine/systems/EventManager";
import { PlayerArsenal } from "../player/PlayerArsenal";
import { defaultStats } from "../player/playerDefaultStats";
import { PlayerShield } from "../player/PlayerShield";
import { PlayerHUD } from "../player/PlayerHUD";
import * as Colors from "../utils/constants/colors";
import { Indicator } from "../ui/Indicator";
import { entityManager } from "../systems/EntityManager";
import { Shard } from "./projectiles/Shard";
import { TAU } from "@/engine/utils/math";

const upgrades = {
  speed: 1.25,
  cooldown: 30,
};

export class Player extends Projectile {
  #controller;
  #fury;
  #lives;
  #godMode;
  #arsenal;
  #shield;
  #shards;
  #hud;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);

    this.#shards = [];
    const maxShards = 8;
    const angle = (Math.PI * 2) / maxShards;
    const padding = this.radius + 24;

    for (let i = 0; i < maxShards; i++) {
      const shard = new Shard(this, 5, 3, angle * i, "#fff", 10, padding);
      this.#shards.push(shard);
      entityManager.add(shard);
    }

    this.#controller = new PlayerController(this);
    this.#arsenal = new PlayerArsenal(this);
    this.#shield = new PlayerShield(this);
    this.#hud = new PlayerHUD(this);
    this.#fury = new Fury();
    this.#lives = defaultStats.lives;
    this.#godMode = defaultStats.godMode;

    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
    eventManager.subscribe("shieldCollected", () => this.#activateShield(8000));
    eventManager.subscribe("lifeCollected", ({ collect }) => {
      if (this.lives < defaultStats.lives) {
        this.#lives++;
        collect();
        eventManager.emit("playerHealed");
      }
    });
    eventManager.subscribe("furyCollected", ({ collect, amount }) => {
      if (!this.#fury.isActive()) {
        eventManager.emit("checkFuryMeterToFill", { collect, amount });
      }
    });
    eventManager.subscribe("activatedFury", () => {
      this.color = Colors.RED;
      this.weapon.cooldown.waitTime -= upgrades.cooldown;
      this.speed *= upgrades.speed;
    });
    eventManager.subscribe("deactivateFury", () => {
      this.color = Colors.WHITE;
      this.weapon.cooldown.waitTime += upgrades.cooldown;
      this.speed /= upgrades.speed;
    });
    eventManager.subscribe("gunChange", ({ prev }) => {
      if (!this.#fury.isActive()) return;
      prev.cooldown.waitTime += upgrades.cooldown;
      this.weapon.cooldown.waitTime -= upgrades.cooldown;
    });
    eventManager.subscribe("shardsCollected", () => {
      const angle = TAU / this.#shards.length;
      const index = this.#shards.findIndex((shard) => !shard.destroyed);
      let prevAngle = index >= 0 ? this.#shards[index].angle : 0;

      this.#shards.forEach((shard, i) => {
        shard.x = this.x;
        shard.y = this.y;
        shard.angle = prevAngle + angle * i;

        if (shard.destroyed) {
          shard.restore();
          entityManager.add(shard);
        }
      });
    });
  }

  get lives() {
    return this.#lives;
  }

  get shield() {
    return this.#shield;
  }

  get arsenal() {
    return this.#arsenal;
  }

  get weapon() {
    return this.#arsenal.equipped;
  }

  get isDead() {
    return this.#lives <= 0;
  }

  #onEnemyKilled() {
    if (!this.#fury.isActive()) {
      eventManager.emit("fillFuryMeter", { amount: 4 });
    }
  }

  #activateShield(delay) {
    this.#godMode = true;
    this.#shield.activate(delay);
  }

  #resetShield() {
    this.#godMode = false;
    this.#shield.reset();
  }

  toggleGodMode(force) {
    this.#godMode = force ?? !this.#godMode;
  }

  takeHit() {
    if (this.#godMode) return;

    this.#lives--;
    eventManager.emit("playerHit", { lives: this.#lives });
    const particles = !this.isDead ? 8 : 16;
    Particle.createParticles(this.x, this.y, 8, 313, this.color, particles);

    if (this.isDead) {
      this.die();
      Indicator.create({ x: this.x, y: this.y }, "DEATH!");
      return;
    }

    this.#activateShield();
  }

  die() {
    eventManager.emit("playerDeath");
    this.#shards.forEach((shard) => shard.destroy());
  }

  revive(x = this.x, y = this.y) {
    this.#lives = defaultStats.lives;
    this.x = x;
    this.y = y;
    this.#resetShield();
    eventManager.emit("playerRevival", { lives: this.#lives });
  }

  onCollision(object) {
    if (this.isDead) {
      return;
    } else if (object?.check) {
      object.check();
    } else if (object?.drop) {
      this.takeHit();
    }
  }

  draw(ctx) {
    if (this.isDead) return;
    super.draw(ctx);
    this.#hud.drawHUD(ctx);
    this.#shield.draw(ctx);
    this.#arsenal.draw(ctx);
  }

  update(delta) {
    if (this.isDead) return;
    this.#controller.update(delta);
    this.#arsenal.update(delta);
    this.#fury.update(delta);
    this.getInCanvas(gameState.getEntity("mainCanvas").canvasSize);
  }
}
