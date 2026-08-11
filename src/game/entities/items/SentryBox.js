import { POWDER_BLUE } from "@/game/constants/colors";
import { Item } from "./Item";
import { entityManager } from "@/game/systems/EntityManager";
import { Sentry } from "../Sentry";

export class SentryBox extends Item {
  check() {
    const turret = new Sentry(12, POWDER_BLUE);
    entityManager.add(this.x, this.y, turret);
    this.collect();
  }
}
