import { eventManager } from "../singletons/EventManager.js";
import { Timer } from "../Timer.js";

const upgrades = {
  speedMultiplier: 1.25,
  weaponCooldown: 30,
};

class Fury {
  #timer;
  #status;
  #player;
  #duration;

  constructor(player, duration = 5000) {
    this.#timer = new Timer(
      duration,
      { autostart: false, loop: false },
      this.deactivate.bind(this),
    );
    this.#status = false;
    this.#player = player;
    this.#duration = duration;
    eventManager.subscribe("activateFury", () => this.activate());
    eventManager.subscribe("beforeWeaponChange", () =>
      this.#shouldChangeFireRate(false),
    );
    eventManager.subscribe("afterWeaponChange", () =>
      this.#shouldChangeFireRate(true),
    );
  }

  get timer() {
    return this.#timer;
  }

  get duration() {
    return this.#duration;
  }

  activate() {
    if (this.isActive()) return;
    this.#timer.reset();
    this.#status = true;
    this.#changeUpgradeState(true);
  }

  deactivate() {
    if (!this.isActive()) return;
    this.#timer.stop();
    this.#status = false;
    this.#changeUpgradeState(false);
  }

  isActive() {
    return this.#status;
  }

  #shouldChangeFireRate(upgradeState) {
    if (this.isActive()) {
      this.#changeFireRateState(upgradeState);
    }
  }

  #changeFireRateState(upgradeState) {
    const { weaponCooldown } = upgrades;
    const modifier = upgradeState ? -1 : 1;
    this.#player.weapon.cooldown.waitTime += modifier * weaponCooldown;
  }

  #changeUpgradeState(upgradeState) {
    const { speedMultiplier } = upgrades;
    const playerSpeed = this.#player.speed;
    const modifiedSpeed = upgradeState
      ? playerSpeed * speedMultiplier
      : playerSpeed / speedMultiplier;
    this.#player.speed = modifiedSpeed;
    this.#changeFireRateState(upgradeState);
  }
}

export { Fury };
