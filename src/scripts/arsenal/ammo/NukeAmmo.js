import { ARMY_GREEN } from "@/scripts/utils/constants/colors";
import { ExplosiveAmmo } from "./ExplosiveAmmo";
import { Explosive } from "../projectiles/Explosive";
import { MissileAmmo } from "./MissileAmmo";
import { CANNON_DMG } from "./damages";

class NukeAmmo extends ExplosiveAmmo {
  constructor(name = "Nuke", fragmentType = new MissileAmmo()) {
    super(name, fragmentType);
  }

  create(x, y, angle) {
    const radius = 20;
    const speed = 350;
    const color = ARMY_GREEN;
    const damage = CANNON_DMG;
    const fragments = {
      amount: 10,
      createFragments: (x, y, direction) =>
        this.fragmentType.create(x, y, direction),
    };
    new Explosive(x, y, radius, speed, angle, color, damage, fragments);
  }
}

export { NukeAmmo };
