import { Layers } from "../constants/layers";
import { Entity } from "../entities/Entity";

class EntityManager {
  #entityGroups;

  constructor() {
    this.#entityGroups = new Map();
  }

  #updateEntities(delta) {
    for (const entry of this.#entityGroups) {
      const group = entry[0];
      let list = entry[1];
      for (let i = list.length - 1; i >= 0; i--) {
        list[i].update(delta);
      }
      list = list.filter((e) => !e.destroyed);
      this.#entityGroups.set(group, list);
    }
  }

  add(entity, group = Layers.OTHERS) {
    try {
      if (!(entity instanceof Entity)) {
        throw new Error("Invalid entity!");
      }

      if (!this.#entityGroups.has(group)) {
        this.#entityGroups.set(group, []);
      }
      this.#entityGroups.get(group).push(entity);
    } catch (error) {
      console.error(error);
    }
  }

  get(group) {
    return this.#entityGroups.get(group) ?? [];
  }

  manage(delta) {
    this.#updateEntities(delta);
  }

  clear(keep) {}
}

export const entityManager = new EntityManager();
