import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Cannon extends Weapon {
  constructor(player, cooldown = 250) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const color = this.player.color;

    new Bullet(playerX, playerY, 20, 312, bulletAngle, color, 40);
  }
}

export { Cannon };
