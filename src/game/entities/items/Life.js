import { eventManager } from "@/engine/systems/EventManager";
import { CRIMSON } from "@/game/constants/colors";
import { Item } from "./Item";

class Life extends Item {
  constructor(radius, color = CRIMSON, label = "life") {
    super(radius, color, label);
  }

  check() {
    eventManager.emit("lifeCollected", { collect: this.collect.bind(this) });
  }
}

export { Life };
