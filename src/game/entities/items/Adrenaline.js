import { eventManager } from "@/engine/systems/EventManager";
import { Item } from "./Item";

class Adrenaline extends Item {
  check() {
    eventManager.emit("furyCollected", {
      amount: 10,
      collect: this.collect.bind(this),
    });
  }
}

export { Adrenaline };
