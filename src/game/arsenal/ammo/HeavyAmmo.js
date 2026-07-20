import { VERY_LIGHT_YELLOW } from "@/game/utils/constants/colors";
import { HEAVY_DMG } from "./damages";
import { AmmoType } from "./AmmoType";
import { Bullet } from "../../entities/projectiles/Bullet";
import { entityManager } from "@/game/systems/EntityManager";

class HeavyAmmo extends AmmoType {
  constructor(name = "Heavy") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 5;
    const speed = 1250;
    const color = VERY_LIGHT_YELLOW;
    const damage = HEAVY_DMG;
    const ammo = new Bullet(x, y, radius, speed, angle, color, damage);
    entityManager.add(ammo);
  }
}

export { HeavyAmmo };
