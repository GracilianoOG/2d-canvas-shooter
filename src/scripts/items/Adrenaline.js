import { eventManager } from "../singletons/EventManager";
import { ORANGE_RED } from "../utils/constants/colors";
import { Item } from "./Item";

class Adrenaline extends Item {
  constructor(x, y, radius, color = ORANGE_RED, label = "fury") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("furyCollected", { collect: this.collect.bind(this) });
  }
}

export { Adrenaline };
