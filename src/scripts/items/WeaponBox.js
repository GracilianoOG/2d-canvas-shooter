import { getRandomWeapon } from "@/data/weapons";
import { eventManager } from "../systems/EventManager";
import { CHARTREUSE } from "../utils/constants/colors";
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
