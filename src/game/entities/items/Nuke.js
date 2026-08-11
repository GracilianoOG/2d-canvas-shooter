import { YELLOW } from "@/game/constants/colors";
import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";
import { Layers } from "@/game/constants/layers";

export class Nuke extends Item {
  constructor(radius, color = YELLOW, label = "nuke") {
    super(radius, color, label);
  }

  check() {
    for (const enemy of entityManager.get(Layers.ENEMIES)) {
      enemy.takeDamage(enemy.health);
    }

    this.collect();
  }
}
