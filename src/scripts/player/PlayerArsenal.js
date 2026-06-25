import { Pistol } from "../arsenal/guns/Pistol";
import { eventManager } from "../singletons/EventManager";
import { Timer } from "../Timer";
import { randomInt } from "../utils/utility";

class PlayerArsenal {
  #guns;
  #durationTimer;
  #player;

  constructor(player) {
    this.#guns = { pistol: new Pistol(player) };

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
    const [weaponId, Weapon] = weapon;
    this.#durationTimer.waitTime = 10_000;
    eventManager.emit("beforeWeaponChange");
    this.#durationTimer.reset();
    if (!(weaponId in this.#guns)) {
      this.#guns[weaponId] = new Weapon(this.#player);
    }
    this.#player.weapon = this.#guns[weaponId];
    eventManager.emit("afterWeaponChange");
  }

  #equipDefaultGun() {
    this.#player.weapon = this.#guns["pistol"];
  }

  #onPlayerDeath() {
    this.#durationTimer.stop();
    this.#equipDefaultGun();
  }
}

export { PlayerArsenal };
