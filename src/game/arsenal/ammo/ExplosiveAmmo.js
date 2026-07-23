class ExplosiveAmmo {
  #fragmentType;

  constructor(name, fragmentType) {
    super(name);
    this.#fragmentType = fragmentType;
  }

  get fragmentType() {
    return this.#fragmentType;
  }
}

export { ExplosiveAmmo };
