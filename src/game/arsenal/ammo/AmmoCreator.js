import { Layers } from "@/game/constants/layers";
import { ProjectileFactory } from "@/game/entities/projectiles/ProjectileFactory";
import { entityManager } from "@/game/systems/EntityManager";

export class AmmoCreator {
  #type;

  constructor(type) {
    this.#type = type;
  }

  create(x, y, angle) {
    entityManager.add(
      x,
      y,
      ProjectileFactory.create(this.#type, angle),
      Layers.AMMO,
    );
  }
}
