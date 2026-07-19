import { ARMY_GREEN } from "@/scripts/utils/constants/colors";
import { PistolAmmo } from "./PistolAmmo";
import { ExplosiveAmmo } from "./ExplosiveAmmo";
import { HEAVY_DMG } from "./damages";
import { Mine } from "../../entities/projectiles/Mine";
import { entityManager } from "@/scripts/systems/EntityManager";

class MineAmmo extends ExplosiveAmmo {
  constructor(name = "Mine", fragmentType = new PistolAmmo()) {
    super(name, fragmentType);
  }

  create(x, y, angle) {
    const radius = 6;
    const speed = 500;
    const color = ARMY_GREEN;
    const damage = HEAVY_DMG;
    const fragments = {
      amount: 16,
      createFragments: (x, y, direction) =>
        this.fragmentType.create(x, y, direction),
    };
    const ammo = new Mine(x, y, radius, speed, angle, color, damage, fragments);
    entityManager.add(ammo);
  }
}

export { MineAmmo };
