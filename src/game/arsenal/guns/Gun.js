import { inputManager } from "@/engine/systems/InputManager";
import { Timer } from "@/engine/systems/Timer";
import { randomNumber } from "@/engine/utils/math";
import { eventManager } from "@/engine/systems/EventManager";
import { AmmoFactory } from "../ammo/AmmoFactory";
import { PatternFactory } from "./patterns/PatternFactory";

export class Gun {
  #name;
  #cooldown;
  #ammoType;
  #options;
  #pattern;

  constructor({ name, ammoType, patternType, options }) {
    this.#name = name;
    this.#options = options;
    this.#cooldown = Timer.create(options.cooldown, { loop: false });
    this.#ammoType = AmmoFactory.request(ammoType);
    this.#pattern = PatternFactory.create(patternType);
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

  #calcBulletPath(originX, originY) {
    const { x: mx, y: my } = inputManager.getMousePosition();
    const angle = Math.atan2(my - originY, mx - originX);
    return angle;
  }

  rollAccuracy() {
    const spread = this.#options?.spread;
    return spread ? randomNumber(spread, -spread) : 0;
  }

  shoot(x, y) {
    if (this.#cooldown.active) return;
    const bulletAngle = this.#calcBulletPath(x, y);
    this.#cooldown.reset();
    this.#pattern.create(this, x, y, bulletAngle);
    eventManager.emit("audio", "shot");
  }
}
