import { Nuke } from "../ammo/Nuke";
import { Weapon } from "./Weapon";

class NukeLauncher extends Weapon {
  constructor(player, cooldown = 380) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Nuke(playerX, playerY, 20, 5, bulletAngle, this.owner.color, 60);
  }
}

export { NukeLauncher };
