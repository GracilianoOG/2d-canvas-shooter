import { WHITE } from "@/scripts/utils/constants/colors";
import { BASE_DMG } from "./damages";
import { AmmoType } from "./AmmoType";
import { Bullet } from "../projectiles/Bullet";
import { entityManager } from "@/scripts/systems/EntityManager";

class PistolAmmo extends AmmoType {
  constructor(name = "Common") {
    super(name);
  }

  create(x, y, angle) {
    const radius = 5;
    const speed = 1250;
    const color = WHITE;
    const damage = BASE_DMG;
    const ammo = new Bullet(x, y, radius, speed, angle, color, damage);
    entityManager.add(ammo);
  }
}

export { PistolAmmo };
