import { randomInt } from "@/engine/utils/math";
import { Enemy } from "./Enemy";

class Boomer extends Enemy {
  #options;

  constructor(enemyData, target, events) {
    super(enemyData, target, events);
    this.#options = { minions: { min: 2, max: 5 }, ...enemyData.options };
  }

  onDestroy() {
    const { min, max } = this.#options.minions;
    const amount = randomInt(max + 1, min);
    this.events.emit("spawnMinions", this.x, this.y, amount);
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
