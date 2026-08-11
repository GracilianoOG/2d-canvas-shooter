import { WHITE } from "@/game/constants/colors";
import { Item } from "./Item";
import { eventManager } from "@/engine/systems/EventManager";

export class Shards extends Item {
  constructor(radius, color = WHITE, label = "shards") {
    super(radius, color, label);
  }

  check() {
    eventManager.emit("shardsCollected");
    this.collect();
  }
}
