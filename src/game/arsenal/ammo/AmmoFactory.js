import { AmmoCreator } from "./AmmoCreator";

export class AmmoFactory {
  static #types = new Map();

  static request(type) {
    if (!AmmoFactory.#types.has(type)) {
      AmmoFactory.#types.set(type, new AmmoCreator(type));
    }
    return AmmoFactory.#types.get(type);
  }
}
