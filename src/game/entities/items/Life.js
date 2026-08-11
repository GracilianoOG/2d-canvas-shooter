import { eventManager } from "@/engine/systems/EventManager";
import { Item } from "./Item";

class Life extends Item {
  check() {
    eventManager.emit("lifeCollected", { collect: this.collect.bind(this) });
  }
}

export { Life };
