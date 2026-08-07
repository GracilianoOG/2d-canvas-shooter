import { Entity } from "../entities/Entity";

class EntityManager {
  #entities;
  #queue;

  constructor() {
    this.#entities = [];
    this.#queue = [];
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

  #addFromQueue() {
    this.#entities.push(...this.#queue);
    this.#queue = [];
  }

  #orderEntities() {
    this.#entities.sort((a, b) => a.radius - b.radius);
  }

  add(entity) {
    try {
      if (!(entity instanceof Entity)) {
        throw new Error("Invalid entity!");
      }
      this.#queue.push(entity);
    } catch (error) {
      console.error(error);
    }
  }

  manage(delta) {
    this.#updateEntities(delta);
    this.#removeDestroyed();
    this.#addFromQueue();
    this.#orderEntities();
  }

  clear(keep) {
    this.#entities = [...keep];
  }
}

export const entityManager = new EntityManager();
