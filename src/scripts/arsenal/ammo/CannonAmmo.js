import { VERY_LIGHT_YELLOW } from "@/scripts/utils/constants/colors";
import { CANNON_DMG } from "./damages";
import { AmmoType } from "./AmmoType";
import { Bullet } from "../projectiles/Bullet";
import { entityManager } from "@/scripts/systems/EntityManager";

class CannonAmmo extends AmmoType {
  constructor(name = "Cannon") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 20;
    const speed = 350;
    const color = VERY_LIGHT_YELLOW;
    const damage = CANNON_DMG;
    const ammo = new Bullet(x, y, radius, speed, angle, color, damage);
    entityManager.add(ammo);
  }
}

export { CannonAmmo };
