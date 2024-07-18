class GameState {
  #entities;

  constructor(entities) {
    this.#entities = {
      ...entities,
      bullets: [],
      enemies: [],
      particles: []
    };
  }

  get entities() {
    return this.#entities;
  }
}

export { GameState };