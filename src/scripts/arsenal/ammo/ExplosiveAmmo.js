import { AmmoType } from "./AmmoType";

class ExplosiveAmmo extends AmmoType {
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
