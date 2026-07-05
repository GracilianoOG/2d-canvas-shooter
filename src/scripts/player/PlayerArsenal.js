import { Pistol } from "../arsenal/guns/Pistol";
import { eventManager } from "../singletons/EventManager";
import { Timer } from "../Timer";

class PlayerArsenal {
  #inventory;
  #durationTimer;
  #player;

  constructor(player) {
    this.#inventory = new Map();
    this.#inventory.set("pistol", new Pistol());

    this.#player = player;
    this.#equipDefault();

    this.#durationTimer = new Timer(
      0,
      { loop: false, autostart: false },
      () => {
        eventManager.emit("beforeWeaponChange");
        this.#equipDefault();
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
    const [weaponId, addWeapon] = weapon;
    this.#durationTimer.waitTime = 10_000;
    eventManager.emit("beforeWeaponChange");
    this.#durationTimer.reset();
    if (!this.#inventory.has(weaponId)) {
      this.#inventory.set(weaponId, addWeapon());
    }
    this.#equip(weaponId);
    eventManager.emit("afterWeaponChange");
  }

  #equip(id) {
    this.#player.weapon = this.#inventory.get(id);
  }

  #equipDefault() {
    this.#equip("pistol");
  }

  #onPlayerDeath() {
    this.#durationTimer.stop();
    this.#equipDefault();
  }
}

export { PlayerArsenal };
