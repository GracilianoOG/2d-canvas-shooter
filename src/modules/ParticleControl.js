class ParticleControl {
  #particles;
  #ctx;

  constructor({ particles, context }) {
    this.#particles = particles;
    this.#ctx = context;
  }

  update() {
    const particlesLength = this.#particles.length;

    for(let i = 0; i < particlesLength; i++) {
      this.#particles[i].update(this.#ctx);
    }
  }
}

export { ParticleControl };