class BulletControl {
  #bullets;
  #ctx;

  constructor({ bullets, context }) {
    this.#bullets = bullets;
    this.#ctx = context;
  }

  update() {
    const bulletsLength = this.#bullets.length;
    
    for(let i = 0; i < bulletsLength; i++) {
      this.#bullets[i].update(this.#ctx);
    }
  }
}

export { BulletControl };