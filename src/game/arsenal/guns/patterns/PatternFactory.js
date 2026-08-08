import { ExplosiveShot } from "./ExplosiveShot";
import { MultiShot } from "./MultiShot";
import { SingleShot } from "./SingleShot";

export class PatternFactory {
  static #types = new Map();

  static #request(key, callback) {
    if (!PatternFactory.#types.has(key)) {
      PatternFactory.#types.set(key, callback());
    }
    return PatternFactory.#types.get(key);
  }

  static create(type) {
    switch (type) {
      case "single":
        return PatternFactory.#request(type, () => new SingleShot());
      case "multi":
        return PatternFactory.#request(type, () => new MultiShot());
      case "explosive":
        return PatternFactory.#request(type, () => new ExplosiveShot());
    }
  }
}
