import { eventManager } from "@/engine/systems/EventManager";
import { ENERGETIC_BLUE } from "@/game/constants/colors";
import { Item } from "./Item";

class Shield extends Item {
  constructor(radius, color = ENERGETIC_BLUE, label = "shield") {
    super(radius, color, label);
  }

  check() {
    eventManager.emit("shieldCollected");
    super.collect();
  }
}

export { Shield };
