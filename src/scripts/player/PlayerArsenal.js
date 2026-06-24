import { eventManager } from "../singletons/EventManager";
import { Timer } from "../Timer";
import { randomInt } from "../utils/utility";
import { AcidShotgun } from "@/scripts/arsenal/guns/AcidShotgun";
import { Bazooka } from "@/scripts/arsenal/guns/Bazooka";
import { BulletHell } from "@/scripts/arsenal/guns/BulletHell";
import { Cannon } from "@/scripts/arsenal/guns/Cannon";
import { Crossbow } from "@/scripts/arsenal/guns/Crossbow";
import { FlechetteShotgun } from "@/scripts/arsenal/guns/FlechetteShotgun";
import { GrenadeLauncher } from "@/scripts/arsenal/guns/GrenadeLauncher";
import { MineLauncher } from "@/scripts/arsenal/guns/MineLauncher";
import { Minigun } from "@/scripts/arsenal/guns/Minigun";
import { NukeLauncher } from "@/scripts/arsenal/guns/NukeLauncher";
import { Pistol } from "@/scripts/arsenal/guns/Pistol";
import { Ricochet } from "@/scripts/arsenal/guns/Ricochet";
import { Shotgun } from "@/scripts/arsenal/guns/Shotgun";
import { SubmachineGun } from "@/scripts/arsenal/guns/SubmachineGun";

class PlayerArsenal {
  #guns;
  #durationTimer;
  #player;

  constructor(player) {
    this.#guns = [
      new AcidShotgun(player),
      new Bazooka(player),
      new BulletHell(player),
      new Cannon(player),
      new Crossbow(player),
      new FlechetteShotgun(player),
      new GrenadeLauncher(player),
      new MineLauncher(player),
      new Minigun(player),
      new NukeLauncher(player),
      new Pistol(player),
      new Ricochet(player),
      new Shotgun(player),
      new SubmachineGun(player),
    ];

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
  }

  get durationTimer() {
    return this.#durationTimer;
  }

  randomizeGun() {
    const randomGun = this.#guns[randomInt(0, this.#guns.length)];
    this.#durationTimer.waitTime = 10_000;

    eventManager.emit("beforeWeaponChange");

    this.#durationTimer.reset();
    this.#player.weapon = randomGun;

    eventManager.emit("afterWeaponChange");
  }

  #equipDefaultGun() {
    this.#player.weapon = this.#guns[10];
  }

  #onPlayerDeath() {
    this.#durationTimer.stop();
    this.#equipDefaultGun();
  }
}

export { PlayerArsenal };
