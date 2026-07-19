import { VIOLET } from "@/scripts/utils/constants/colors";
import { Flechette } from "../../entities/projectiles/Flechette";
import { RICOCHET_DMG } from "./damages";
import { AmmoType } from "./AmmoType";
import { entityManager } from "@/scripts/systems/EntityManager";

class RicochetAmmo extends AmmoType {
  constructor(name = "Ricochet") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 8;
    const speed = 750;
    const color = VIOLET;
    const damage = RICOCHET_DMG;
    const ammo = new Flechette(x, y, radius, speed, angle, color, damage);
    entityManager.add(ammo);
  }
}

export { RicochetAmmo };
