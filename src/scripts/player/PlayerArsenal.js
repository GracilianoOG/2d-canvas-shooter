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

    this.#durationTimer = new Timer(0, { loop: false, autostart: false }, () =>
      this.#equipDefault(),
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
    this.#durationTimer.reset();
    this.#add(weaponId, addWeapon());
    this.#equip(weaponId);
  }

  #add(id, weapon) {
    if (!this.#inventory.has(id)) {
      this.#inventory.set(id, weapon);
    }
  }

  #equip(id) {
    eventManager.emit("beforeWeaponChange");
    this.#player.weapon = this.#inventory.get(id);
    eventManager.emit("afterWeaponChange");
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
