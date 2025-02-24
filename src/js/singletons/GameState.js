class GameState {
  #entities;
  static instance;

  constructor(entities = {}) {
    if (GameState.instance) {
      return GameState.instance;
    }
    GameState.instance = this;

    this.#entities = {
      ...entities,
    };
  }

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  get entities() {
    return this.#entities;
  }
}

export { GameState };
