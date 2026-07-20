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

  #renderEntities(ctx, delta) {
    for (let i = 0; i < this.#entities.length; i++) {
      const entity = this.#entities[i];
      entity.draw(ctx);
      entity.update(delta);
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

  renderAll(ctx, delta) {
    this.#renderEntities(ctx, delta);
    this.#removeDestroyed();
    this.#addFromQueue();
    this.#orderEntities();
  }

  clear(keep) {
    this.#entities = [...keep];
  }
}

export const entityManager = new EntityManager();
