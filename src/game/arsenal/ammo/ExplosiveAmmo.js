class ExplosiveAmmo {
  #fragmentType;

  constructor(fragmentType) {
    this.#fragmentType = fragmentType;
  }

  get fragmentType() {
    return this.#fragmentType;
  }
}

export { ExplosiveAmmo };
