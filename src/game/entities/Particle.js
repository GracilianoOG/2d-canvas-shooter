import { TAU } from "@/game/utils/math";
import { Layers } from "../constants/layers";
import { Projectile } from "./Projectile";
import { particleData } from "@/data/particleData";

export class Particle extends Projectile {
  #randomizer = Math.random();
  #age;
  #lifetime;
  #baseRadius;

  constructor(data, color) {
    const { radius, speed } = data;
    super(radius, speed, color ?? data.color, Math.random() * TAU);
    this.#age = 0;
    this.#lifetime = 0.1;
    this.#baseRadius = this.radius;
  }

  static create(entities, x, y, amount, color) {
    for (let i = 0; i < amount; i++) {
      const particle = new Particle(particleData, color);
      entities.add(x, y, particle, Layers.PARTICLES);
    }
  }

  update(delta) {
    this.moveTowards(delta, this.#randomizer);
    this.shrink(this.#baseRadius * (this.#age / this.#lifetime) * delta);
    this.#age += delta;
  }
}
