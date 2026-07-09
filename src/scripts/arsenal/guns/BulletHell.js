import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

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
    let rotation = 0;
    const TAU = Math.PI * 2;
    const angle = TAU / this.options.bullets;

    while (rotation <= TAU) {
      this.ammoType.create(x, y, rotation);
      rotation += angle;
    }
  }
}

export { BulletHell };
