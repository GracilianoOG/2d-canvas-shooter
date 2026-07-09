import { ARMY_GREEN } from "@/scripts/utils/constants/colors";
import { PistolAmmo } from "./PistolAmmo";
import { ExplosiveAmmo } from "./ExplosiveAmmo";
import { Explosive } from "../projectiles/Explosive";
import { HEAVY_DMG } from "./damages";

class MissileAmmo extends ExplosiveAmmo {
  constructor(name = "Missile", fragmentType = new PistolAmmo()) {
    super(name, fragmentType);
  }

  create(x, y, angle) {
    const radius = 12;
    const speed = 400;
    const color = ARMY_GREEN;
    const damage = HEAVY_DMG;
    const fragments = {
      amount: 20,
      createFragments: (x, y, direction) =>
        this.fragmentType.create(x, y, direction),
    };
    new Explosive(x, y, radius, speed, angle, color, damage, fragments);
  }
}

export { MissileAmmo };
