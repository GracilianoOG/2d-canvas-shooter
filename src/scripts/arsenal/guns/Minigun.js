import { VERY_LIGHT_YELLOW } from "../../utils/constants/colors";
import { randomNumber } from "../../utils/utility";
import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Minigun extends Weapon {
  constructor(player, cooldown = 90) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const max = 0.1;
    const min = -max;
    const accuracy = randomNumber(min, max);
    const color = VERY_LIGHT_YELLOW;
    new Bullet(playerX, playerY, 5, 1250, bulletAngle - accuracy, color, 20);
  }
}

export { Minigun };
