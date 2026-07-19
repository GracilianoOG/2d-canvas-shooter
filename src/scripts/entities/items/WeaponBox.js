import { getRandomWeapon } from "@/data/weapons";
import { eventManager } from "@/scripts/engine/systems/EventManager";
import { CHARTREUSE } from "@/scripts/utils/constants/colors";
import { Item } from "./Item";

class WeaponBox extends Item {
  constructor(x, y, radius, color = CHARTREUSE, label = "gun") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("weaponBoxCollected", {
      weapon: getRandomWeapon(),
    });
    super.collect();
  }
}

export { WeaponBox };
