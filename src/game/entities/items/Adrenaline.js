import { eventManager } from "@/engine/systems/EventManager";
import { ORANGE_RED } from "@/game/constants/colors";
import { Item } from "./Item";

class Adrenaline extends Item {
  constructor(radius, color = ORANGE_RED, label = "fury") {
    super(radius, color, label);
  }

  check() {
    eventManager.emit("furyCollected", {
      amount: 10,
      collect: this.collect.bind(this),
    });
  }
}

export { Adrenaline };
