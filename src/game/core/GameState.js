class GameState {
  #entities;

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  getEntity(name) {
    return this.#entities[name];
  }
}

export const gameState = new GameState();
