import { RicochetAmmo } from "../ammo/RicochetAmmo";
import { Shotgun } from "./Shotgun";

class RicochetShotgun extends Shotgun {
  constructor({ name, ammoType = new RicochetAmmo(), options } = {}) {
    super({
      name,
      ammoType,
      options: {
        spread: 0.3,
        ...options,
      },
    });
  }
}

export { RicochetShotgun };
