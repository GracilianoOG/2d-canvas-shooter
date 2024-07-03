class GameState {
  #objects;

  constructor(objects) {
    this.#objects = {
      ...objects,
      bullets: [],
      enemies: [],
      particles: []
    };
  }

  get objects() {
    return this.#objects;
  }

  updateObjects(array) {
    for(let i = array.length - 1; i >= 0; i--) {
      const elem = array[i];
      elem.update(this.#objects.mainCanvas.context);
      elem.toDestroy && array.splice(i, 1);
    }
  }
}

export { GameState };