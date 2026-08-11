import { eventManager } from "@/engine/systems/EventManager";
import { Item } from "./Item";

class Shield extends Item {
  check() {
    eventManager.emit("shieldCollected");
    super.collect();
  }
}

export { Shield };
