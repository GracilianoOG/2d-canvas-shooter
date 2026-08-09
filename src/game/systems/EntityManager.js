import { Entity } from "../entities/Entity";

class EntityManager {
  #entities;
  #entityGroups;

  constructor() {
    this.#entities = [];
    this.#entityGroups = new Map();
  }

  get entities() {
    return this.#entities;
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

  #removeDestroyed() {
    this.#entities = this.#entities.filter((e) => !e.destroyed);
  }

  #orderEntities() {
    this.#entities.sort((a, b) => b.radius - a.radius);
  }

  add(entity) {
    try {
      if (!(entity instanceof Entity)) {
        throw new Error("Invalid entity!");
      }

      this.#entities.push(entity);
    } catch (error) {
      console.error(error);
    }
  }

  manage(delta) {
    this.#updateEntities(delta);
    this.#removeDestroyed();
    this.#orderEntities();
  }

  clear(keep) {
    this.#entities = [...keep];
  }
}

export const entityManager = new EntityManager();
