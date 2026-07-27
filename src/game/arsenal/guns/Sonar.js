import { PistolAmmo } from "../ammo/PistolAmmo";
import { Shotgun } from "./Shotgun";

export class Sonar extends Shotgun {
  constructor({ name = "Sonar", ammoType = new PistolAmmo(), options } = {}) {
    super({
      name,
      ammoType,
      options: {
        bullets: 8,
        cooldown: 300,
        propagation: 0.1,
        spread: 0,
        ...options,
      },
    });
  }
}
