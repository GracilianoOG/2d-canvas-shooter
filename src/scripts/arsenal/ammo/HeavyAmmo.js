import { VERY_LIGHT_YELLOW } from "@/scripts/utils/constants/colors";
import { HEAVY_DMG } from "./damages";
import { AmmoType } from "./AmmoType";
import { Bullet } from "../projectiles/Bullet";

class HeavyAmmo extends AmmoType {
  constructor(name = "Heavy") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 5;
    const speed = 1250;
    const color = VERY_LIGHT_YELLOW;
    const damage = HEAVY_DMG;
    new Bullet(x, y, radius, speed, angle, color, damage);
  }
}

export { HeavyAmmo };
