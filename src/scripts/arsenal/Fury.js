import { eventManager } from "../singletons/EventManager.js";
import { Timer } from "../Timer.js";

const upgrades = {
  playerSpeed: 2,
  weaponCooldown: 50,
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
    eventManager.subscribe("beforeWeaponChange", () => {
      if (this.isActive()) {
        this.#restoreFireRate();
      }
    });
    eventManager.subscribe("afterWeaponChange", () => {
      if (this.isActive()) {
        this.#increaseFireRate();
      }
    });
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
    this.#applyUpgrades();
  }

  deactivate() {
    if (!this.isActive()) return;
    this.#timer.stop();
    this.#status = false;
    this.#removeUpgrades();
  }

  isActive() {
    return this.#status;
  }

  #increaseFireRate() {
    const cooldownTime = this.#player.weapon.cooldown.waitTime;
    const { weaponCooldown } = upgrades;
    this.#player.weapon.cooldown.waitTime = cooldownTime - weaponCooldown;
  }

  #restoreFireRate() {
    const cooldownTime = this.#player.weapon.cooldown.waitTime;
    const { weaponCooldown } = upgrades;
    this.#player.weapon.cooldown.waitTime = cooldownTime + weaponCooldown;
  }

  #applyUpgrades() {
    this.#increaseFireRate();
    const { playerSpeed } = upgrades;
    this.#player.speed += playerSpeed;
  }

  #removeUpgrades() {
    this.#restoreFireRate();
    const { playerSpeed } = upgrades;
    this.#player.speed -= playerSpeed;
  }
}

export { Fury };
