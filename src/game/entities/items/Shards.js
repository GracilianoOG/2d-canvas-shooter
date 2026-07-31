import { WHITE } from "@/game/constants/colors";
import { Item } from "./Item";
import { eventManager } from "@/engine/systems/EventManager";

export class Shards extends Item {
  constructor(x, y, radius, color = WHITE, label = "shards") {
    super(x, y, radius, color, label);
  }

  check() {
    eventManager.emit("shardsCollected");
    this.collect();
  }
}
