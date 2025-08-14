import { eventManager } from "../singletons/EventManager";
import { Timer } from "../Timer";
import { randomInt } from "../utils/utility";
import { AcidShotgun } from "./guns/AcidShotgun";
import { Bazooka } from "./guns/Bazooka";
import { BulletHell } from "./guns/BulletHell";
import { Cannon } from "./guns/Cannon";
import { Crossbow } from "./guns/Crossbow";
import { FlechetteShotgun } from "./guns/FlechetteShotgun";
import { GrenadeLauncher } from "./guns/GrenadeLauncher";
import { MineLauncher } from "./guns/MineLauncher";
import { Minigun } from "./guns/Minigun";
import { NukeLauncher } from "./guns/NukeLauncher";
import { Pistol } from "./guns/Pistol";
import { Ricochet } from "./guns/Ricochet";
import { Shotgun } from "./guns/Shotgun";
import { SubmachineGun } from "./guns/SubmachineGun";

const GunTypes = Object.freeze({
  ACID_SHOTGUN: "ACID_SHOTGUN",
  BAZOOKA: "BAZOOKA",
  BULLET_HELL: "BULLET_HELL",
  CANNON: "CANNON",
  CROSSBOW: "CROSSBOW",
  FLECHETTE_SHOTGUN: "FLECHETTE_SHOTGUN",
  GRENADE_LAUNCHER: "GRENADE_LAUNCHER",
  MINE_LAUNCHER: "MINE_LAUNCHER",
  MINIGUN: "MINIGUN",
  NUKE_LAUNCHER: "NUKE_LAUNCHER",
  RICOCHET: "RICOCHET",
  SHOTGUN: "SHOTGUN",
  SMG: "SMG",
  PISTOL: "PISTOL",
});

class Arsenal {
  #guns;
  #durationTimer;
  #player;

  constructor(player) {
    this.#guns = {
      [GunTypes.ACID_SHOTGUN]: new AcidShotgun(player),
      [GunTypes.BAZOOKA]: new Bazooka(player),
      [GunTypes.BULLET_HELL]: new BulletHell(player),
      [GunTypes.CANNON]: new Cannon(player),
      [GunTypes.CROSSBOW]: new Crossbow(player),
      [GunTypes.FLECHETTE_SHOTGUN]: new FlechetteShotgun(player),
      [GunTypes.GRENADE_LAUNCHER]: new GrenadeLauncher(player),
      [GunTypes.MINE_LAUNCHER]: new MineLauncher(player),
      [GunTypes.MINIGUN]: new Minigun(player),
      [GunTypes.NUKE_LAUNCHER]: new NukeLauncher(player),
      [GunTypes.PISTOL]: new Pistol(player),
      [GunTypes.RICOCHET]: new Ricochet(player),
      [GunTypes.SHOTGUN]: new Shotgun(player),
      [GunTypes.SMG]: new SubmachineGun(player),
    };

    this.#player = player;

    this.#durationTimer = new Timer(
      0,
      { loop: false, autostart: false },
      () => {
        eventManager.emit("beforeWeaponChange");
        this.defaultGun();
        eventManager.emit("afterWeaponChange");
      }
    );

    eventManager.subscribe("playerDeath", this.#onPlayerDeath.bind(this));
  }

  get durationTimer() {
    return this.#durationTimer;
  }

  randomizeGun() {
    const availableGuns = Object.values(GunTypes);
    const length = availableGuns.length - 1;
    const randomGun = availableGuns[randomInt(0, length)];
    let gun = null;

    switch (randomGun) {
      case GunTypes.ACID_SHOTGUN:
        gun = this.#guns[GunTypes.ACID_SHOTGUN];
        this.#durationTimer.waitTime = 12_000;
        break;
      case GunTypes.BAZOOKA:
        gun = this.#guns[GunTypes.BAZOOKA];
        this.#durationTimer.waitTime = 10_000;
        break;
      case GunTypes.BULLET_HELL:
        gun = this.#guns[GunTypes.BULLET_HELL];
        this.#durationTimer.waitTime = 8_000;
        break;
      case GunTypes.CANNON:
        gun = this.#guns[GunTypes.CANNON];
        this.#durationTimer.waitTime = 10_000;
        break;
      case GunTypes.FLECHETTE_SHOTGUN:
        gun = this.#guns[GunTypes.FLECHETTE_SHOTGUN];
        this.#durationTimer.waitTime = 12_000;
        break;
      case GunTypes.CROSSBOW:
        gun = this.#guns[GunTypes.CROSSBOW];
        this.#durationTimer.waitTime = 12_000;
        break;
      case GunTypes.GRENADE_LAUNCHER:
        gun = this.#guns[GunTypes.GRENADE_LAUNCHER];
        this.#durationTimer.waitTime = 15_000;
        break;
      case GunTypes.MINE_LAUNCHER:
        gun = this.#guns[GunTypes.MINE_LAUNCHER];
        this.#durationTimer.waitTime = 15_000;
        break;
      case GunTypes.MINIGUN:
        gun = this.#guns[GunTypes.MINIGUN];
        this.#durationTimer.waitTime = 12_000;
        break;
      case GunTypes.NUKE_LAUNCHER:
        gun = this.#guns[GunTypes.NUKE_LAUNCHER];
        this.#durationTimer.waitTime = 10_000;
        break;
      case GunTypes.RICOCHET:
        gun = this.#guns[GunTypes.RICOCHET];
        this.#durationTimer.waitTime = 15_000;
        break;
      case GunTypes.SHOTGUN:
        gun = this.#guns[GunTypes.SHOTGUN];
        this.#durationTimer.waitTime = 15_000;
        break;
      case GunTypes.SMG:
        gun = this.#guns[GunTypes.SMG];
        this.#durationTimer.waitTime = 20_000;
        break;
      default:
        throw new Error("Invalid gun!");
    }

    eventManager.emit("beforeWeaponChange");

    this.#durationTimer.reset();
    this.#player.weapon = gun;

    eventManager.emit("afterWeaponChange");
  }

  defaultGun() {
    this.#player.weapon = this.#guns[GunTypes.PISTOL];
  }

  #onPlayerDeath() {
    this.#durationTimer.stop();
    this.defaultGun();
  }
}

export { Arsenal };
