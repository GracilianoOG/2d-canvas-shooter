import { GrenadeAmmo } from "../ammo/GrenadeAmmo";
import { Shotgun } from "./Shotgun";

export class ExplosiveShotgun extends Shotgun {
  constructor({ name = "Broom", ammoType = new GrenadeAmmo(), options } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 350,
        propagation: 0.3,
        spread: 0.2,
        ...options,
      },
    });
  }
}
