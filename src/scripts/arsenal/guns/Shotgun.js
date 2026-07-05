import { randomNumber } from "@/scripts/utils/utility";
import { PistolAmmo } from "../ammo/PistolAmmo";
import { Gun } from "./Gun";

class Shotgun extends Gun {
  constructor(ammoType = new PistolAmmo(), cooldown = 200) {
    super(ammoType, cooldown);
  }

  createProjectile(x, y) {
    const { originX, originY, bulletAngle } = this.calcBulletPath(x, y);
    const spread = 0.2;
    const bullets = 3;

    for (let i = 0; i < bullets; i++) {
      const accuracy = randomNumber(spread, -spread);
      this.ammoType.create(originX, originY, bulletAngle + accuracy);
    }
  }
}

export { Shotgun };
