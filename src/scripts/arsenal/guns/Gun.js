import { gameState } from "@/scripts/core/GameState";
import { inputManager } from "@/scripts/systems/InputManager";
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

  get fullName() {
    return `${this.#ammoType.name} ${this.#name}`;
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
    const { width: rWidth, height: rHeight } =
      gameState.getEntity("realCanvas");
    const { left, top } = gameState.getEntity("realCanvas").rect;
    const { width: mWidth, height: mHeight } =
      gameState.getEntity("mainCanvas");

    const { x: mouseX, y: mouseY } = inputManager.getMousePosition(left, top);

    const scaleXFactor = rWidth / mWidth;
    const scaleYFactor = rHeight / mHeight;

    const scaledMouseX = mouseX / scaleXFactor;
    const scaledMouseY = mouseY / scaleYFactor;

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
