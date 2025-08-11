import { Entity } from "../Entity";

class Item extends Entity {
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
  }

  collect() {}
}

export { Item };
