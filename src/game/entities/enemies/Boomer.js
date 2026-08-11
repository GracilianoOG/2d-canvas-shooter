import { randomInt } from "@/engine/utils/math";
import { Enemy } from "./Enemy";
import { entityManager } from "@/game/systems/EntityManager";
import { Layers } from "@/game/constants/layers";

class Boomer extends Enemy {
  #baseSize;
  #baseSpeed;
  #baseHp;
  #options;

  constructor(enemyData) {
    super(enemyData);
    this.#baseSize = enemyData.radius;
    this.#baseSpeed = enemyData.speed;
    this.#baseHp = enemyData.hp;
    this.#options = { minions: { min: 2, max: 5 }, ...enemyData.options };
  }

  onDestroy() {
    const { min, max } = this.#options.minions;
    const amount = randomInt(max + 1, min);
    const x = this.x + randomInt(this.#baseSize, -this.#baseSize);
    const y = this.y + randomInt(this.#baseSize, -this.#baseSize);

    for (let i = 0; i < amount; i++) {
      const minion = new Enemy({
        radius: Math.max(this.#baseSize / 2, 10),
        speed: Math.max(Math.floor(this.#baseSpeed / 2), 5),
        color: this.baseColor,
        hp: Math.max(this.#baseHp / 2, 10),
        score: this.score,
      }).target(this.currentTarget());
      entityManager.add(x, y, minion, Layers.ENEMIES);
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
