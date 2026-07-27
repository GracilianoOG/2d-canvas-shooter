import { HeavyAmmo } from "../ammo/HeavyAmmo";
import { Shotgun } from "./Shotgun";

class HeavyShotgun extends Shotgun {
  constructor({
    name = "Super Shotgun",
    ammoType = new HeavyAmmo(),
    options,
  } = {}) {
    super({
      name,
      ammoType,
      options: {
        bullets: 2,
        cooldown: 220,
        spread: 0.02,
        ...options,
      },
    });
  }
}

export { HeavyShotgun };
