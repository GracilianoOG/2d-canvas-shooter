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

  updateObjects(array) {
    for(let i = array.length - 1; i >= 0; i--) {
      const elem = array[i];
      elem.update(this.#entities.mainCanvas.context);
      elem.toDestroy && array.splice(i, 1);
    }
  }
}

export { GameState };