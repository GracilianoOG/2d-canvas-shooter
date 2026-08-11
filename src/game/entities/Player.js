import { Particle } from "./Particle";
import { PlayerController } from "../player/PlayerController";
import { Projectile } from "./Projectile";
import { Fury } from "../arsenal/Fury";
import { eventManager } from "../../engine/systems/EventManager";
import { PlayerArsenal } from "../player/PlayerArsenal";
import { defaultStats } from "../player/playerDefaultStats";
import { PlayerShield } from "../player/PlayerShield";
import * as Colors from "../constants/colors";
import { PlayerShards } from "../player/PlayerShards";
import { PlayerHealth } from "../player/PlayerHealth";
import { config } from "../config";

const upgrades = {
  speed: 1.25,
  cooldown: 30,
};

export class Player extends Projectile {
  #controller;
  #fury;
  #health;
  #arsenal;
  #shield;
  #shards;

  constructor({ radius, speed, color }) {
    super(radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#arsenal = new PlayerArsenal(this);
    this.#shield = new PlayerShield(this);
    this.#shards = new PlayerShards(this, 8);
    this.#health = new PlayerHealth(this, defaultStats.lives);
    this.#fury = new Fury();

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
    eventManager.subscribe("restart", () =>
      this.revive(config.width / 2, config.height / 2),
    );
  }

  get #weapon() {
    return this.#arsenal.equipped;
  }

  get lives() {
    return this.#health.lives;
  }

  get isDead() {
    return this.lives <= 0;
  }

  takeHit() {
    if (this.#shield.isActive()) return;

    this.#health.damage();
    eventManager.emit("playerHit", { lives: this.#health.lives });
    const particles = !this.isDead ? 8 : 16;
    Particle.create(this.x, this.y, 8, 313, this.color, particles);

    if (this.isDead) {
      this.die();
      eventManager.emit("indicate", { x: this.x, y: this.y }, "DEATH!");
      return;
    }

    this.#shield.activate();
  }

  die() {
    eventManager.emit("playerDeath");
  }

  revive(x = this.x, y = this.y) {
    this.#health.revive(x, y);
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
    this.#health.draw(ctx);
    this.#shield.draw(ctx);
    this.#arsenal.draw(ctx);
  }

  update(delta) {
    if (this.isDead) return;
    this.#controller.update(delta);
    this.#arsenal.update(delta);
    this.#fury.update(delta);
    this.getInCanvas(config);
  }
}
