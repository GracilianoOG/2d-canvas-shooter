import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";
import { Explosive } from "@/game/entities/projectiles/Explosive";

class BulletHell extends Gun {
  constructor({
    name = "Bullet Hell",
    ammoType = new PistolAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 120,
        bullets: 20,
        ...options,
      },
    });
  }

  createProjectile(x, y) {
    const amount = this.options.bullets;
    Explosive.explode(x, y, {
      amount,
      createFragments: this.ammoType.create,
    });
  }
}

export { BulletHell };
