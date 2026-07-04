import { Pistol } from "../arsenal/guns/Pistol";
import { eventManager } from "../singletons/EventManager";
import { Timer } from "../Timer";
import { randomInt } from "../utils/utility";

class PlayerArsenal {
  #inventory;
  #durationTimer;
  #player;

  constructor(player) {
    this.#inventory = { pistol: new Pistol(player) };

    this.#player = player;
    this.#equipDefaultGun();

    this.#durationTimer = new Timer(
      0,
      { loop: false, autostart: false },
      () => {
        eventManager.emit("beforeWeaponChange");
        this.#equipDefaultGun();
        eventManager.emit("afterWeaponChange");
      },
    );

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
    eventManager.subscribe("weaponBoxCollected", ({ weapon }) =>
      this.switchWeapon(weapon),
    );
  }

  get durationTimer() {
    return this.#durationTimer;
  }

  switchWeapon(weapon) {
    const [weaponId, WeaponClass] = weapon;
    this.#durationTimer.waitTime = 10_000;
    eventManager.emit("beforeWeaponChange");
    this.#durationTimer.reset();
    if (!(weaponId in this.#inventory)) {
      this.#inventory[weaponId] = new WeaponClass(this.#player);
    }
    this.#player.weapon = this.#inventory[weaponId];
    eventManager.emit("afterWeaponChange");
  }

  #equipDefaultGun() {
    this.#player.weapon = this.#inventory["pistol"];
  }

  #onPlayerDeath() {
    this.#durationTimer.stop();
    this.#equipDefaultGun();
  }
}

export { PlayerArsenal };
