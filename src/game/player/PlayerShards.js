import { TAU } from "@/engine/utils/math";
import { Shard } from "../entities/projectiles/Shard";
import { Layers } from "../constants/layers";
import { shardsData } from "@/data/shardsData";

export class PlayerShards {
  #shards;
  #player;
  #entities;
  #maxShards;

  constructor(player, entities, events) {
    this.#shards = [];
    this.#player = player;
    this.#entities = entities;
    this.#maxShards = shardsData.max;

    events.on("shardsPickup", this.#restoreShards.bind(this));
    events.on("playerDeath", () =>
      this.#shards.forEach((shard) => shard.destroy()),
    );
  }

  #initShards() {
    const angle = TAU / this.#maxShards;
    const padding = this.#player.radius;
    const data = { ...shardsData, padding: padding + shardsData.padding };

    for (let i = 0; i < this.#maxShards; i++) {
      const shard = new Shard(this.#player, angle * i, data);
      this.#shards.push(shard);
      this.#entities.add(this.#player.x, this.#player.y, shard, Layers.AMMO);
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
        this.#entities.add(this.#player.x, this.#player.y, shard, Layers.AMMO);
      }
    }
  }
}
