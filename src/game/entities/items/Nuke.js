import { YELLOW } from "@/game/constants/colors";
import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";

export class Nuke extends Item {
  constructor(x, y, radius, color = YELLOW, label = "nuke") {
    super(x, y, radius, color, label);
  }

  check() {
    const enemies = entityManager.entities.filter((ent) => ent?.drop);

    for (const enemy of enemies) {
      enemy.takeDamage(enemy.health);
    }

    this.collect();
  }
}
