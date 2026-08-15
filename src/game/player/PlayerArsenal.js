import { randomInt } from "@/engine/utils/math";
import { Timer } from "../../engine/systems/Timer";
import { CHARTREUSE, LIGHT_YELLOW } from "../constants/colors";
import { weaponData, weaponIds } from "@/data/weaponData";
import { Gun } from "../arsenal/guns/Gun";

export class PlayerArsenal {
  #inventory;
  #duration;
  #timer;
  #equipped;
  #player;
  #events;
  #input;

  constructor(player, events, input) {
    this.#player = player;
    this.#events = events;
    this.#input = input;
    this.#inventory = {};
    this.#equipped = this.#get("pistol");

    this.#duration = 12_000;
    this.#timer = Timer.create(this.#duration, { autostart: false }, () =>
      this.#equipDefault(),
    );

    this.#events.on("playerDeath", this.#onPlayerDeath.bind(this));
    this.#events.on("gunPickup", this.switchWeapon.bind(this));
  }

  get equipped() {
    return this.#equipped;
  }

  #get(id) {
    const gun = this.#inventory[id];
    if (!gun) {
      // console.error(`Provided "${id}" weapon doesn't exist!`);
      // return this.#inventory["pistol"];
      this.#inventory[id] = new Gun(weaponData[id]);
    }
    return this.#inventory[id];
  }

  #equip(id) {
    const prev = this.#equipped;
    const next = this.#get(id);
    if (prev !== next) {
      this.#equipped = next;
      this.#events.emit("gunChange", { prev });
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

  switchWeapon(item) {
    const weaponId = this.#randomWeaponId();
    this.#timer.reset();
    this.#equip(weaponId);

    this.#events.emit(
      "indicate",
      { x: item.x, y: item.y },
      this.#equipped.name.toUpperCase(),
      CHARTREUSE,
    );

    item.collect(false);
  }

  draw(ctx) {
    if (this.#timer.active) {
      const padding = 10;
      this.#player.drawArc(ctx, LIGHT_YELLOW, padding, this.#timer.timeLeft());
    }
  }

  update(_delta) {
    if (!this.#player.isDead && this.#input.isActionPressed("shoot")) {
      const { x, y } = this.#player;
      this.#equipped.shoot(x, y);
    }
  }
}
