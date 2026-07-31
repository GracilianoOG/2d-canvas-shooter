import { eventManager } from "@/engine/systems/EventManager";
import { CHARTREUSE } from "@/game/constants/colors";
import { Item } from "./Item";

class WeaponBox extends Item {
  constructor(x, y, radius, color = CHARTREUSE, label = "gun") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("gunPickup", {
      origin: { x: this.x, y: this.y },
    });
    super.collect();
  }

  onCollect() {}
}

export { WeaponBox };
