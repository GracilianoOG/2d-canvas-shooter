import { eventManager } from "@/engine/systems/EventManager";
import { ORANGE_RED } from "@/game/utils/constants/colors";
import { Item } from "./Item";

class Adrenaline extends Item {
  constructor(x, y, radius, color = ORANGE_RED, label = "fury") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("furyCollected", {
      amount: 10,
      collect: this.collect.bind(this),
    });
  }
}

export { Adrenaline };
