import { eventManager } from "@/engine/systems/EventManager";
import { Item } from "./Item";

class WeaponBox extends Item {
  check() {
    eventManager.emit("gunPickup", {
      origin: { x: this.x, y: this.y },
    });
    super.collect();
  }

  onCollect() {}
}

export { WeaponBox };
