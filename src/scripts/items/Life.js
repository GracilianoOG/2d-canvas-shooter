import { eventManager } from "../systems/EventManager";
import { CRIMSON } from "../utils/constants/colors";
import { Item } from "./Item";

class Life extends Item {
  constructor(x, y, radius, color = CRIMSON, label = "life") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("lifeCollected", { collect: this.collect.bind(this) });
  }
}

export { Life };
