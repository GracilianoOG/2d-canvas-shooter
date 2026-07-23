import { POWDER_BLUE } from "@/game/utils/constants/colors";
import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";
import { Sentry } from "../Sentry";

export class SentryBox extends Item {
  constructor(x, y, radius, color = POWDER_BLUE, label = "sentry") {
    super(x, y, radius, color, label);
  }

  check() {
    const turret = new Sentry(this.x, this.y, 12, POWDER_BLUE);
    entityManager.add(turret);
    this.collect();
  }
}
