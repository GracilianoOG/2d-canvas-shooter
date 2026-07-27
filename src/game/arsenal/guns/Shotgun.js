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
        spread: 0.08,
        ...options,
      },
    });
  }

  createProjectile(x, y, angle) {
    const propagation = 0.2;
    const amount = this.options.bullets;
    let nextCurve = -propagation * Math.floor(amount / 2);

    nextCurve += amount % 2 === 0 ? propagation / 2 : 0;

    for (let i = 0; i < amount; i++) {
      this.ammoType.create(x, y, angle + nextCurve + this.rollAccuracy());
      nextCurve += propagation;
    }
  }
}

export { Shotgun };
