class EnemyControl {
  #enemies;
  #ctx;

  constructor({ enemies, context }) {
    this.#enemies = enemies;
    this.#ctx = context;
  }

  update() {
    const enemiesLength = this.#enemies.length;

    for(let i = 0; i < enemiesLength; i++) {
      this.#enemies[i].update(this.#ctx);
    }
  }
}

export { EnemyControl };