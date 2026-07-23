import { GrenadeAmmo } from "../ammo/GrenadeAmmo";
import { Shotgun } from "./Shotgun";

export class ExplosiveShotgun extends Shotgun {
  constructor({
    name = "Boom Shotgun",
    ammoType = new GrenadeAmmo(),
    options,
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 300,
        spread: 0.4,
        ...options,
      },
    });
  }
}
