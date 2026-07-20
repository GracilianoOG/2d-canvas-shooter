import { HeavyAmmo } from "../ammo/HeavyAmmo";
import { Shotgun } from "./Shotgun";

class HeavyShotgun extends Shotgun {
  constructor({ name, ammoType = new HeavyAmmo(), options } = {}) {
    super({
      name,
      ammoType,
      options: {
        cooldown: 240,
        spread: 0.3,
        ...options,
      },
    });
  }
}

export { HeavyShotgun };
