import { randomNumber } from "../../utils/utility";
import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Minigun extends Weapon {
  constructor(owner, cooldown = 90) {
    super(owner, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const max = 0.1;
    const min = -max;
    const accuracy = randomNumber(min, max);
    const color = this.owner.color;
    new Bullet(playerX, playerY, 5, 20, bulletAngle - accuracy, color, 20);
  }
}

export { Minigun };
