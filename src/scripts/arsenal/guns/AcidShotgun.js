import { ACID_GREEN } from "../../utils/constants/colors";
import { randomNumber } from "../../utils/utility";
import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class AcidShotgun extends Weapon {
  constructor(player, cooldown = 200) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const max = 0.3;
    const min = -max;
    const MAX_BULLETS = 3;

    for (let i = 0; i < MAX_BULLETS; i++) {
      const accuracy = randomNumber(min, max);
      const angle = bulletAngle + accuracy;
      new Bullet(playerX, playerY, 5, 20, angle, ACID_GREEN, 20);
    }
  }
}

export { AcidShotgun };
