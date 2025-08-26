import { randomNumber } from "../../utils/utility";
import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Shotgun extends Weapon {
  constructor(player, cooldown = 200) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const max = 0.2;
    const min = -max;
    const color = this.player.color;
    const MAX_BULLETS = 3;

    for (let i = 0; i < MAX_BULLETS; i++) {
      const accuracy = randomNumber(min, max);
      new Bullet(playerX, playerY, 5, 1250, bulletAngle + accuracy, color);
    }
  }
}

export { Shotgun };
