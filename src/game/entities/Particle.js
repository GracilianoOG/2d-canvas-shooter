import { Layers } from "../constants/layers";
import { entityManager } from "../systems/EntityManager";
import { Projectile } from "./Projectile";

export class Particle extends Projectile {
  #angle = Math.random() * 2 * Math.PI;
  #randomizer = Math.random();
  #age;
  #lifetime;
  #baseRadius;

  constructor(radius, speed, color) {
    super(radius, speed, color);
    this.#age = 0;
    this.#lifetime = 0.1;
    this.#baseRadius = this.radius;
  }

  static create(x, y, size, speed, color, amount) {
    for (let i = 0; i < amount; i++) {
      const particle = new Particle(size, speed, color);
      entityManager.add(x, y, particle, Layers.PARTICLES);
    }
  }

  update(delta) {
    this.x += Math.cos(this.#angle) * this.speed * delta + this.#randomizer;
    this.y += Math.sin(this.#angle) * this.speed * delta + this.#randomizer;
    this.shrink(this.#baseRadius * (this.#age / this.#lifetime) * delta);
    this.#age += delta;
  }
}
