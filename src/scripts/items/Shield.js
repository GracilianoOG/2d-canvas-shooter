import { eventManager } from "../singletons/EventManager";
import { Item } from "./Item";

class Shield extends Item {
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
  }

  onDestroy() {
    eventManager.emit("shieldCollected");
  }
}

export { Shield };
