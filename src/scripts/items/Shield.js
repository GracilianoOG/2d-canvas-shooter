import { eventManager } from "../singletons/EventManager";
import { ENERGETIC_BLUE } from "../utils/constants/colors";
import { Item } from "./Item";

class Shield extends Item {
  constructor(x, y, radius = 10, color = ENERGETIC_BLUE, label = "shield") {
    super(x, y, radius, color, label);
  }

  collect() {
    super.collect();
    eventManager.emit("shieldCollected");
  }
}

export { Shield };
