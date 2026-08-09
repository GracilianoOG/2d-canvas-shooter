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
    for (let i = this.#entities.length - 1; i >= 0; i--) {
      this.#entities[i].update(delta);
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
