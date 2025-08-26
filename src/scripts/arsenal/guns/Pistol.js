import { Bullet } from "../Bullet";
import { Weapon } from "./Weapon";

class Pistol extends Weapon {
  constructor(player, cooldown = 150) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    const color = this.player.color;
    new Bullet(playerX, playerY, 5, 1250, bulletAngle, color);
  }
}

export { Pistol };
