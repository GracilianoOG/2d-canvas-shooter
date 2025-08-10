import { ARMY_GREEN } from "../../utils/constants/colors";
import { Mine } from "../ammo/Mine";
import { Weapon } from "./Weapon";

class MineLauncher extends Weapon {
  constructor(player, cooldown = 250) {
    super(player, cooldown);
  }

  createProjectile() {
    const { playerX, playerY } = this._calcBulletPath();
    new Mine(playerX, playerY, 8, 0, 0, ARMY_GREEN, 30);
  }
}

export { MineLauncher };
