import { ARMY_GREEN } from "@/scripts/utils/constants/colors";
import { PistolAmmo } from "./PistolAmmo";
import { ExplosiveAmmo } from "./ExplosiveAmmo";
import { Explosive } from "../../entities/projectiles/Explosive";
import { BASE_DMG } from "./damages";
import { entityManager } from "@/scripts/systems/EntityManager";

class GrenadeAmmo extends ExplosiveAmmo {
  constructor(name = "Grenade", fragmentType = new PistolAmmo()) {
    super(name, fragmentType);
  }

  create(x, y, angle) {
    const radius = 10;
    const speed = 500;
    const color = ARMY_GREEN;
    const damage = BASE_DMG;
    const fragments = {
      amount: 10,
      createFragments: (x, y, direction) =>
        this.fragmentType.create(x, y, direction),
    };
    const ammo = new Explosive(
      x,
      y,
      radius,
      speed,
      angle,
      color,
      damage,
      fragments,
    );
    entityManager.add(ammo);
  }
}

export { GrenadeAmmo };
