import { WHITE } from "@/game/utils/constants/colors";
import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";
import { Sentry } from "../Sentry";

export class SentryBox extends Item {
  constructor(x, y, radius, color = WHITE, label = "sentry") {
    super(x, y, radius, color, label);
  }

  check() {
    const turret = new Sentry(this.x, this.y, 12, "#B0E0E6");
    entityManager.add(turret);
    this.collect();
  }
}
