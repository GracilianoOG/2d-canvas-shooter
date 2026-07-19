import { randomInt } from "@/scripts/engine/utils/math";
import { Enemy } from "./Enemy";

class Boomer extends Enemy {
  #baseSize;
  #baseSpeed;
  #baseHp;
  #target;
  #options;

  constructor(x, y, radius, speed, color, health, score, target, options = {}) {
    super(x, y, radius, speed, color, health, score, target, options);
    this.#target = target;
    this.#baseSize = radius;
    this.#baseSpeed = speed;
    this.#baseHp = health;
    this.#options = { minions: { min: 2, max: 5 }, ...options };
  }

  onDestroy() {
    const { min, max } = this.#options.minions;
    const amount = randomInt(max + 1, min);
    for (let i = 0; i < amount; i++) {
      new Enemy(
        this.x + randomInt(this.#baseSize, -this.#baseSize),
        this.y + randomInt(this.#baseSize, -this.#baseSize),
        Math.max(this.#baseSize / 2, 10),
        Math.max(Math.floor(this.#baseSpeed / 2), 5),
        this.baseColor,
        Math.max(this.#baseHp / 2, 10),
        this.score,
        this.#target,
      );
    }
    this.drop(0.05);
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
