import { eventManager } from "../singletons/EventManager";
import { GOLDEN } from "../utils/constants/colors";
import { Item } from "./Item";

class Adrenaline extends Item {
  constructor(x, y, radius = 10, color = GOLDEN, label = "fury") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("furyCollected", { item: this });
  }
}

export { Adrenaline };
