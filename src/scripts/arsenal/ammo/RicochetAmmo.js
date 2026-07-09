import { VIOLET } from "@/scripts/utils/constants/colors";
import { Flechette } from "./Flechette";
import { RICOCHET_DMG } from "./damages";
import { AmmoType } from "./AmmoType";

class RicochetAmmo extends AmmoType {
  constructor(name = "Ricochet") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 8;
    const speed = 750;
    const color = VIOLET;
    const damage = RICOCHET_DMG;
    new Flechette(x, y, radius, speed, angle, color, damage);
  }
}

export { RicochetAmmo };
