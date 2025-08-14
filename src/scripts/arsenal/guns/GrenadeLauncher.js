import { ARMY_GREEN } from "../../utils/constants/colors";
import { Grenade } from "../ammo/Grenade";
import { Weapon } from "./Weapon";

class GrenadeLauncher extends Weapon {
  constructor(player, cooldown = 220) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY, bulletAngle } = this._calcBulletPath();
    new Grenade(playerX, playerY, 6, 15, bulletAngle, ARMY_GREEN, 20);
  }
}

export { GrenadeLauncher };
