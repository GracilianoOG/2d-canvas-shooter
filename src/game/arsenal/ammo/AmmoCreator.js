import { ProjectileFactory } from "@/game/entities/projectiles/ProjectileFactory";
import { entityManager } from "@/game/systems/EntityManager";

export class AmmoCreator {
  #type;

  constructor(type) {
    this.#type = type;
  }

  create(x, y, angle) {
    entityManager.add(
      ProjectileFactory.create(this.#type, x, y, angle),
      "ammo",
    );
  }
}
