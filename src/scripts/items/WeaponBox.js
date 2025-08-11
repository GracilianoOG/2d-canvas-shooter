import { eventManager } from "../singletons/EventManager";
import { YELLOW } from "../utils/constants/colors";
import { Item } from "./Item";

class WeaponBox extends Item {
  constructor(x, y, radius = 10, color = YELLOW) {
    super(x, y, radius, color);
  }

  collect() {
    super.collect();
    eventManager.emit("weaponBoxCollected");
  }
}

export { WeaponBox };
