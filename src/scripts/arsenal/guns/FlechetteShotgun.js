import { VIOLET } from "../../utils/constants/colors";
import { randomNumber } from "../../utils/utility";
import { Flechette } from "../ammo/Flechette";
import { Weapon } from "./Weapon";

class FlechetteShotgun extends Weapon {
  constructor(player, cooldown = 250) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const max = 0.2;
    const min = -max;
    const MAX_BULLETS = 3;

    for (let i = 0; i < MAX_BULLETS; i++) {
      const accuracy = randomNumber(min, max);
      new Flechette(playerX, playerY, 8, 12, bulletAngle + accuracy, VIOLET);
    }
  }
}

export { FlechetteShotgun };
