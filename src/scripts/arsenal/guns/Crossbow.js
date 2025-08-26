import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Crossbow extends Weapon {
  constructor(player, cooldown = 200) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Bullet(playerX, playerY, 8, 1562, bulletAngle, this.player.color, 30);
  }
}

export { Crossbow };
