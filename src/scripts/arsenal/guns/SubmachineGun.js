import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class SubmachineGun extends Weapon {
  constructor(player, cooldown = 100) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const color = this.player.color;
    new Bullet(playerX, playerY, 5, 20, bulletAngle, color);
  }
}

export { SubmachineGun };
