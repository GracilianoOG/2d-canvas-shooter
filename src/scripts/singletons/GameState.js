class GameState {
  #entities;
  static instance;

  constructor() {
    if (GameState.instance) {
      return GameState.instance;
    }
    GameState.instance = this;
  }

  addEntities(newEntities) {
    this.#entities = { ...this.#entities, ...newEntities };
  }

  getEntity(name) {
    return this.#entities[name];
  }
}

export const gameState = new GameState();
