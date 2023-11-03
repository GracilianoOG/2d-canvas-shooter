class ParticleControl {
  #particles;
  #ctx;

  constructor({ particles, context }) {
    this.#particles = particles;
    this.#ctx = context;
  }

  #deleteParticles() {
    for(let i = 0; i < this.#particles.length; i++) {
      if(this.#particles[i].toDestroy) {
        this.#particles.splice(i, 1);
      }
    }
  }

  update() {
    const particlesLength = this.#particles.length;

    for(let i = 0; i < particlesLength; i++) {
      this.#particles[i].update(this.#ctx);
    }
    this.#deleteParticles();
  }
}

export { ParticleControl };