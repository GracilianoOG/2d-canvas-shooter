import { randomInt } from "@/engine/utils/math";
import { eventManager } from "../../engine/systems/EventManager";
import { Timer } from "../../engine/systems/Timer";
import { CHARTREUSE, LIGHT_YELLOW } from "../constants/colors";
import { weaponIds, weapons } from "@/data/weapons";
import { inputManager } from "@/engine/systems/InputManager";

export class PlayerArsenal {
  #inventory;
  #duration;
  #timer;
  #equipped;
  #player;

  constructor(player) {
    this.#player = player;
    this.#inventory = weapons;
    this.#equipped = this.#get("pistol");

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

  #get(id) {
    return this.#inventory[id];
  }

  #equip(id) {
    const prev = this.#equipped;
    const next = this.#get(id);
    if (prev !== next) {
      this.#equipped = next;
      eventManager.emit("gunChange", { prev });
    }
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
    this.#equip(weaponId);

    eventManager.emit(
      "indicate",
      { x, y },
      this.#equipped.name.toUpperCase(),
      CHARTREUSE,
    );
  }

  draw(ctx) {
    if (this.#timer.active) {
      const gunDelay = this.#timer.waitTime;
      const { elapsedTime } = this.#timer;
      const timePerc = elapsedTime / gunDelay;
      const padding = 10;

      this.#player.drawArc(ctx, LIGHT_YELLOW, padding, timePerc);
    }
  }

  update(_delta) {
    if (!this.#player.isDead && inputManager.isActionPressed("shoot")) {
      const { x, y } = this.#player;
      this.#equipped.shoot(x, y);
    }
  }
}
