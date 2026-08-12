import { TAU } from "@/engine/utils/math";
import { Shard } from "../entities/projectiles/Shard";
import { entityManager } from "../systems/EntityManager";
import { WHITE } from "../constants/colors";
import { eventManager } from "@/engine/systems/EventManager";
import { Layers } from "../constants/layers";

export class PlayerShards {
  #shards;
  #player;
  #maxShards;

  constructor(player, maxShards) {
    this.#shards = [];
    this.#player = player;
    this.#maxShards = maxShards;

    eventManager.on("shardsPickup", this.#restoreShards.bind(this));
    eventManager.on("playerDeath", () =>
      this.#shards.forEach((shard) => shard.destroy()),
    );
  }

  #initShards() {
    const angle = TAU / this.#maxShards;
    const padding = this.#player.radius + 24;
    const col = WHITE;

    for (let i = 0; i < this.#maxShards; i++) {
      const shard = new Shard(this.#player, angle * i, 5, 3, col, 10, padding);
      this.#shards.push(shard);
      entityManager.add(this.#player.x, this.#player.y, shard, Layers.AMMO);
    }
  }

  #restoreShards(shardsItem) {
    shardsItem.collect();

    if (!this.#shards.length) {
      this.#initShards();
      return;
    }

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
        entityManager.add(this.#player.x, this.#player.y, shard, Layers.AMMO);
      }
    }
  }
}
