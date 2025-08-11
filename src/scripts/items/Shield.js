import { eventManager } from "../singletons/EventManager";
import { ENERGETIC_BLUE } from "../utils/constants/colors";
import { Item } from "./Item";

class Shield extends Item {
  constructor(x, y, radius = 10, color = ENERGETIC_BLUE) {
    super(x, y, radius, color);
  }

  collect() {
    eventManager.emit("shieldCollected");
  }
}

export { Shield };
