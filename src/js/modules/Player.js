import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";
import { Particle } from "./Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Weapon } from "./Weapon.js";

class Player extends Entity {
  #isDead = false;
  controller = new PlayerController(this);
  weapon = new Weapon(this);

  constructor(x, y, radius, speed, color) {
    super(new Circle(x, y, radius, color));
    this.speed = speed;
  }

  get isDead() {
    return this.#isDead;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
  }

  kill() {
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 16);
    window.gameState["entities"].gameAudio.playSound("explosion");
    this.isDead = true;
  }

  update() {
    if (this.isDead) return;
    this.controller.update();
  }
}

export { Player };
