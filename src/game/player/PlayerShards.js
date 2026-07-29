import { TAU } from "@/engine/utils/math";
import { Shard } from "../entities/projectiles/Shard";
import { entityManager } from "../systems/EntityManager";
import { WHITE } from "../utils/constants/colors";
import { eventManager } from "@/engine/systems/EventManager";

export class PlayerShards {
  #shards;
  #player;
  #maxShards;

  constructor(player, maxShards) {
    this.#shards = [];
    this.#player = player;
    this.#maxShards = maxShards;

    this.#initShards();

    eventManager.subscribe("shardsCollected", this.#restoreShards.bind(this));
    eventManager.subscribe("playerDeath", () =>
      this.#shards.forEach((shard) => shard.destroy()),
    );
  }

  #initShards() {
    const angle = TAU / this.#maxShards;
    const padding = this.#player.radius + 24;
    const col = WHITE;

    for (let i = 0; i < this.#maxShards; i++) {
      const shard = new Shard(this.#player, 5, 3, angle * i, col, 10, padding);
      this.#shards.push(shard);
      entityManager.add(shard);
    }
  }

  #restoreShards() {
    const angle = TAU / this.#maxShards;
    const index = this.#shards.findIndex((shard) => !shard.destroyed);
    let prevAngle = index >= 0 ? this.#shards[index].angle : 0;

    for (let i = 0; i < this.#maxShards; i++) {
      const shard = this.#shards[i];

      shard.x = this.#player.x;
      shard.y = this.#player.y;
      shard.angle = prevAngle + angle * i;

      if (shard.destroyed) {
        shard.restore();
        entityManager.add(shard);
      }
    }
  }
}
