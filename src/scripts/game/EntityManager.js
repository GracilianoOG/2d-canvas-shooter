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

  add(entity) {
    this.#queue.push(entity);
  }

  renderAll(ctx, delta) {
    this.#renderEntities(ctx, delta);
    this.#removeDestroyed();
    this.#entities.push(...this.#queue);
    this.#queue = [];
  }

  clear(keep) {
    this.#entities = [...keep];
  }
}

export const entityManager = new EntityManager();
