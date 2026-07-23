import { RED } from "@/game/utils/constants/colors";
import { HEAVY_DMG } from "./damages";
import { entityManager } from "@/game/systems/EntityManager";
import { Piercing } from "@/game/entities/projectiles/Piercing";

export class PiercingAmmo {
  create(x, y, angle) {
    const radius = 4;
    const speed = 1500;
    const color = RED;
    const damage = HEAVY_DMG;
    const ammo = new Piercing(x, y, radius, speed, angle, color, damage);
    entityManager.add(ammo);
  }
}
