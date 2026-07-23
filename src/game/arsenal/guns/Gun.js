import { gameState } from "@/game/core/GameState";
import { inputManager } from "@/engine/systems/InputManager";
import { Timer } from "@/engine/systems/Timer";
import { randomNumber } from "@/engine/utils/math";

class Gun {
  #name;
  #cooldown;
  #ammoType;
  #options;

  constructor({ name, ammoType, options }) {
    this.#name = name;
    this.#options = options;
    this.#cooldown = new Timer(options.cooldown, { loop: false });
    this.#ammoType = ammoType;
  }

  get name() {
    return this.#name;
  }

  get cooldown() {
    return this.#cooldown;
  }

  get ammoType() {
    return this.#ammoType;
  }

  set ammoType(ammoType) {
    this.#ammoType = ammoType;
  }

  get options() {
    return this.#options;
  }

  calcBulletPath(originX, originY) {
    const { left, top } = gameState.getEntity("mainCanvas").offset;
    const scaleFactors = gameState.getEntity("mainCanvas").factors;
    const { x: mouseX, y: mouseY } = inputManager.getMousePosition(left, top);

    const scaledMouseX = mouseX / scaleFactors.x;
    const scaledMouseY = mouseY / scaleFactors.y;

    const dirX = scaledMouseX - originX;
    const dirY = scaledMouseY - originY;

    const bulletAngle = Math.atan2(dirY, dirX);

    return bulletAngle;
  }

  rollAccuracy() {
    const spread = this.#options?.spread ?? 0;
    return randomNumber(spread, -spread);
  }

  shoot(x, y) {
    if (this.#cooldown.active) return;
    this.#cooldown.reset();
    this.createProjectile(x, y);
    gameState.getEntity("gameAudio").play("shot");
  }

  createProjectile(x, y) {
    const bulletAngle = this.calcBulletPath(x, y);
    this.ammoType.create(x, y, bulletAngle + this.rollAccuracy());
  }
}

export { Gun };
