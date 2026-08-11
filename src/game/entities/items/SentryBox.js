import { POWDER_BLUE, ROYAL_BLUE } from "@/game/constants/colors";
import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";
import { Sentry } from "../Sentry";

export class SentryBox extends Item {
  constructor(radius, color = ROYAL_BLUE, label = "sentry") {
    super(radius, color, label);
  }

  check() {
    const turret = new Sentry(12, POWDER_BLUE);
    entityManager.add(this.x, this.y, turret);
    this.collect();
  }
}
