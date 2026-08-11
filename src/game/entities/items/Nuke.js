import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";
import { Layers } from "@/game/constants/layers";

export class Nuke extends Item {
  check() {
    for (const enemy of entityManager.get(Layers.ENEMIES)) {
      enemy.takeDamage(enemy.health);
    }

    this.collect();
  }
}
