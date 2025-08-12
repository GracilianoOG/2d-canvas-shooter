import { eventManager } from "../singletons/EventManager";
import { YELLOW } from "../utils/constants/colors";
import { Item } from "./Item";

class WeaponBox extends Item {
  constructor(x, y, radius = 10, color = YELLOW, label = "weapon") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("weaponBoxCollected");
    super.collect();
  }
}

export { WeaponBox };
