import { Pistol } from "../arsenal/guns/Pistol";
import { eventManager } from "../../engine/systems/EventManager";
import { Timer } from "../../engine/systems/Timer";
import { Indicator } from "../ui/Indicator";
import { CHARTREUSE } from "../utils/constants/colors";

class PlayerArsenal {
  #inventory;
  #duration;
  #timer;
  #player;

  constructor(player) {
    this.#inventory = new Map();
    this.#inventory.set("pistol", new Pistol());

    this.#player = player;
    this.#equipDefault();

    this.#duration = 15_000;
    this.#timer = Timer.create(
      this.#duration,
      { loop: false, autostart: false },
      () => this.#equipDefault(),
    );

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
    eventManager.subscribe("weaponBoxCollected", ({ weapon }) =>
      this.switchWeapon(weapon),
    );
  }

  get durationTimer() {
    return this.#timer;
  }

  switchWeapon(weapon) {
    const [weaponId, addWeapon] = weapon;
    this.#timer.reset();
    this.#add(weaponId, addWeapon());
    this.#equip(weaponId);
    Indicator.create(
      { x: this.#player.x, y: this.#player.y },
      this.#player.weapon.name.toUpperCase(),
      CHARTREUSE,
    );
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
    this.#timer.stop();
    this.#equipDefault();
  }
}

export { PlayerArsenal };
