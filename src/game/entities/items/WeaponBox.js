import { getRandomWeapon } from "@/data/weapons";
import { eventManager } from "@/engine/systems/EventManager";
import { CHARTREUSE } from "@/game/utils/constants/colors";
import { Item } from "./Item";

class WeaponBox extends Item {
  constructor(x, y, radius, color = CHARTREUSE, label = "gun") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("weaponBoxCollected", {
      origin: { x: this.x, y: this.y },
      weapon: getRandomWeapon(),
    });
    super.collect();
  }

  onCollect() {}
}

export { WeaponBox };
