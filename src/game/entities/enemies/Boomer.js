import { randomInt } from "@/engine/utils/math";
import { Enemy } from "./Enemy";

class Boomer extends Enemy {
  #baseSize;
  #baseSpeed;
  #baseHp;
  #options;

  constructor(enemyData, target, events) {
    super(enemyData, target, events);
    this.#baseSize = enemyData.radius;
    this.#baseSpeed = enemyData.speed;
    this.#baseHp = enemyData.hp;
    this.#options = { minions: { min: 2, max: 5 }, ...enemyData.options };
  }

  onDestroy() {
    const { min, max } = this.#options.minions;
    const amount = randomInt(max + 1, min);
    const preset = {
      radius: Math.max(this.#baseSize / 2, 10),
      speed: Math.max(Math.floor(this.#baseSpeed / 2), 5),
      color: this.baseColor,
      hp: Math.max(this.#baseHp / 2, 10),
      score: this.score,
    };

    this.events.emit("spawnMinions", this.x, this.y, amount, preset);
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export { Boomer };
