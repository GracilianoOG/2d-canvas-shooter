import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Shotgun extends Gun {
  constructor({
    name = "Shotgun",
    ammoType = new PistolAmmo(),
    options = {},
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 200,
        bullets: 3,
        spread: 0.2,
        ...options,
      },
    });
  }

  createProjectile(x, y) {
    for (let i = 0; i < this.options.bullets; i++) {
      super.createProjectile(x, y);
    }
  }
}

export { Shotgun };
