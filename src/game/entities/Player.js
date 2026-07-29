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
import { PlayerShards } from "../player/PlayerShards";

const upgrades = {
  speed: 1.25,
  cooldown: 30,
};

export class Player extends Projectile {
  #controller;
  #fury;
  #lives;
  #arsenal;
  #shield;
  #shards;
  #hud;

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#arsenal = new PlayerArsenal(this);
    this.#shield = new PlayerShield(this);
    this.#shards = new PlayerShards(this, 8);
    this.#hud = new PlayerHUD(this);
    this.#fury = new Fury();
    this.#lives = defaultStats.lives;

    eventManager.subscribe("enemyDeath", this.#onEnemyKilled.bind(this));
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
      this.#weapon.cooldown.waitTime -= upgrades.cooldown;
      this.speed *= upgrades.speed;
    });
    eventManager.subscribe("deactivateFury", () => {
      this.color = Colors.WHITE;
      this.#weapon.cooldown.waitTime += upgrades.cooldown;
      this.speed /= upgrades.speed;
    });
    eventManager.subscribe("gunChange", ({ prev }) => {
      if (!this.#fury.isActive()) return;
      prev.cooldown.waitTime += upgrades.cooldown;
      this.#weapon.cooldown.waitTime -= upgrades.cooldown;
    });
  }

  get #weapon() {
    return this.#arsenal.equipped;
  }

  get lives() {
    return this.#lives;
  }

  get isDead() {
    return this.#lives <= 0;
  }

  #onEnemyKilled() {
    if (!this.#fury.isActive()) {
      eventManager.emit("fillFuryMeter", { amount: 4 });
    }
  }

  takeHit() {
    if (this.#shield.isActive()) return;

    this.#lives--;
    eventManager.emit("playerHit", { lives: this.#lives });
    const particles = !this.isDead ? 8 : 16;
    Particle.createParticles(this.x, this.y, 8, 313, this.color, particles);

    if (this.isDead) {
      this.die();
      Indicator.create({ x: this.x, y: this.y }, "DEATH!");
      return;
    }

    this.#shield.activate();
  }

  die() {
    eventManager.emit("playerDeath");
  }

  revive(x = this.x, y = this.y) {
    this.#lives = defaultStats.lives;
    this.x = x;
    this.y = y;
    this.#shield.reset();
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
