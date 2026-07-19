import { eventManager } from "@/scripts/engine/systems/EventManager";
import { ENERGETIC_BLUE } from "@/scripts/utils/constants/colors";
import { Item } from "./Item";

class Shield extends Item {
  constructor(x, y, radius, color = ENERGETIC_BLUE, label = "shield") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("shieldCollected");
    super.collect();
  }
}

export { Shield };
