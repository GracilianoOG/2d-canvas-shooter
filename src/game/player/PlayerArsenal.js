import { randomInt } from "@/engine/utils/math";
import { eventManager } from "../../engine/systems/EventManager";
import { Timer } from "../../engine/systems/Timer";
import { Indicator } from "../ui/Indicator";
import { CHARTREUSE } from "../utils/constants/colors";
import { weaponIds, weapons } from "@/data/weapons";

export class PlayerArsenal {
  #inventory;
  #duration;
  #timer;
  #equipped;

  constructor() {
    this.#inventory = weapons;
    this.#equipDefault();

    this.#duration = 12_000;
    this.#timer = Timer.create(
      this.#duration,
      { loop: false, autostart: false },
      () => this.#equipDefault(),
    );

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
    eventManager.subscribe("gunPickup", this.switchWeapon.bind(this));
  }

  get equipped() {
    return this.#equipped;
  }

  get durationTimer() {
    return this.#timer;
  }

  #equip(id) {
    this.#equipped = this.#inventory[id];
  }

  #equipDefault() {
    this.#equip("pistol");
  }

  #onPlayerDeath() {
    this.#timer.stop();
    this.#equipDefault();
  }

  #randomWeaponId() {
    return weaponIds[randomInt(weaponIds.length)];
  }

  switchWeapon({ origin: { x, y } }) {
    const weaponId = this.#randomWeaponId();
    this.#timer.reset();

    const prev = this.#equipped;
    this.#equip(weaponId);

    eventManager.emit("gunChange", { prev });
    Indicator.create({ x, y }, this.#equipped.name.toUpperCase(), CHARTREUSE);
  }
}
