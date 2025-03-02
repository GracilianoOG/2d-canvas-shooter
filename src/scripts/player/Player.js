import { Particle } from "../Particle.js";
import { PlayerController } from "./PlayerController.js";
import { Weapon } from "../arsenal/Weapon.js";
import { Projectile } from "../Projectile.js";

class Player extends Projectile {
  #isDead = false;
  controller = new PlayerController(this);
  weapon = new Weapon(this);

  constructor(x, y, radius, speed, color) {
    super(x, y, radius, speed, color);
  }

  get isDead() {
    return this.#isDead;
  }

  set isDead(isDead) {
    this.#isDead = isDead;
  }

  get type() {
    return "Player";
  }

  #getInCanvas() {
    const { width: cWidth, height: cHeight } =
      window.gameState.entities.mainCanvas;
    const pRadius = this.dimensions.radius;

    // LEFT, RIGHT, UP, DOWN
    if (this.x < pRadius) this.x = pRadius;
    if (this.x + pRadius > cWidth) this.x = cWidth - pRadius;
    if (this.y < pRadius) this.y = pRadius;
    if (this.y + pRadius > cHeight) this.y = cHeight - pRadius;
  }

  kill() {
    Particle.createParticles(this.x, this.y, 8, 5, this.color, 16);
    window.gameState["entities"].gameAudio.playSound("explosion");
    this.isDead = true;
  }

  revive(x = this.x, y = this.y) {
    this.isDead = false;
    this.x = x;
    this.y = y;
  }

  update(ctx) {
    if (this.isDead) return;
    this.controller.update();
    this.#getInCanvas();
    this.draw(ctx);
  }
}

export { Player };
