import { eventManager } from "../singletons/EventManager";
import { LIGHT_RED } from "../utils/constants/colors";
import { Item } from "./Item";

class Life extends Item {
  constructor(x, y, radius = 10, color = LIGHT_RED, label = "life") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("lifeCollected", { item: this });
  }
}

export { Life };
