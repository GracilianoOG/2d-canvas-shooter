import { Timer } from "../Timer.js";

const upgrades = {
  playerSpeed: 2,
  weaponCooldown: 50,
};

class Fury {
  #timer;
  #status;
  #player;

  constructor(player, duration = 5000) {
    this.#timer = new Timer(
      duration,
      { autostart: false, loop: false },
      this.deactivate.bind(this)
    );
    this.#status = false;
    this.#player = player;
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

  #applyUpgrades() {
    const cooldownTime = this.#player.weapon.shootCooldown.waitTime;
    this.#player.speed += upgrades.playerSpeed;
    this.#player.weapon.shootCooldown.waitTime =
      cooldownTime - upgrades.weaponCooldown;
  }

  #removeUpgrades() {
    const cooldownTime = this.#player.weapon.shootCooldown.waitTime;
    this.#player.speed -= upgrades.playerSpeed;
    this.#player.weapon.shootCooldown.waitTime =
      cooldownTime + upgrades.weaponCooldown;
  }
}

export { Fury };
