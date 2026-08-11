import { Item } from "./Item";
import { eventManager } from "@/engine/systems/EventManager";

export class Shards extends Item {
  check() {
    eventManager.emit("shardsCollected");
    this.collect();
  }
}
