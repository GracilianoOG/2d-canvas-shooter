import { Particle } from "./Particle";
import { PlayerController } from "../player/PlayerController";
import { Projectile } from "./Projectile";
import { Fury } from "../arsenal/Fury";
import { PlayerArsenal } from "../player/PlayerArsenal";
import { defaultStats } from "../player/playerDefaultStats";
import { PlayerShield } from "../player/PlayerShield";
import * as Colors from "../constants/colors";
import { PlayerShards } from "../player/PlayerShards";
import { PlayerHealth } from "../player/PlayerHealth";
import { config } from "../config";
import { playerData } from "@/data/playerData";

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
  #events;

  constructor(entities, events) {
    const { radius, speed, color } = playerData;
    super(radius, speed, color);

    this.#controller = new PlayerController(this);
    this.#arsenal = new PlayerArsenal(this);
    this.#shield = new PlayerShield(this);
    this.#shards = new PlayerShards(this, entities, events);
    this.#health = new PlayerHealth(this, defaultStats.lives);
    this.#fury = new Fury();
    this.#events = events;

    this.#events.on("activatedFury", () => {
      this.color = Colors.RED;
      this.#weapon.cooldown.waitTime -= upgrades.cooldown;
      this.speed *= upgrades.speed;
    });
    this.#events.on("deactivateFury", () => {
      this.color = Colors.WHITE;
      this.#weapon.cooldown.waitTime += upgrades.cooldown;
      this.speed /= upgrades.speed;
    });
    this.#events.on("gunChange", ({ prev }) => {
      if (!this.#fury.isActive()) return;
      prev.cooldown.waitTime += upgrades.cooldown;
      this.#weapon.cooldown.waitTime -= upgrades.cooldown;
    });
    this.#events.on("restart", () =>
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
    this.#events.emit("playerHit", { lives: this.#health.lives });
    const particles = !this.isDead ? 8 : 16;
    Particle.create(this.x, this.y, 8, 313, this.color, particles);

    if (this.isDead) {
      this.die();
      this.#events.emit("indicate", { x: this.x, y: this.y }, "DEATH!");
      return;
    }

    this.#shield.activate();
  }

  die() {
    this.#events.emit("playerDeath");
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
