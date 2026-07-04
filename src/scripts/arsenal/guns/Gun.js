import { gameState } from "@/scripts/singletons/GameState";
import { inputManager } from "@/scripts/singletons/InputManager";
import { Timer } from "@/scripts/Timer";

class Gun {
  #cooldown;
  #ammoType;

  constructor(ammoType, cooldown = 150) {
    this.#cooldown = new Timer(cooldown, { loop: false });
    this.#ammoType = ammoType;
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

  calcBulletPath(originX, originY) {
    const { x: mouseX, y: mouseY } = inputManager.mousePosition;

    const { width: rWidth, height: rHeight } =
      gameState.getEntity("realCanvas");
    const { width: mWidth, height: mHeight } =
      gameState.getEntity("mainCanvas");

    const scaleXFactor = rWidth / mWidth;
    const scaleYFactor = rHeight / mHeight;

    const scaledMouseX = mouseX / scaleXFactor;
    const scaledMouseY = mouseY / scaleYFactor;

    const dirX = scaledMouseX - originX;
    const dirY = scaledMouseY - originY;

    const bulletAngle = Math.atan2(dirY, dirX);

    return {
      originX,
      originY,
      bulletAngle,
    };
  }

  shoot(x, y) {
    if (this.#cooldown.active) return;
    this.#cooldown.reset();
    this.createProjectile(x, y);
    gameState.getEntity("gameAudio").playSound("shot");
  }

  createProjectile(x, y) {
    const { originX, originY, bulletAngle } = this.calcBulletPath(x, y);
    this.ammoType.create(originX, originY, bulletAngle);
  }
}

export { Gun };
