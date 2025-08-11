import { randomInt } from "../utils/utility";
import { AcidShotgun } from "./guns/AcidShotgun";
import { Bazooka } from "./guns/Bazooka";
import { BulletHell } from "./guns/BulletHell";
import { Cannon } from "./guns/Cannon";
import { Crossbow } from "./guns/Crossbow";
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

  constructor(player) {
    this.#guns = {
      [GunTypes.ACID_SHOTGUN]: new AcidShotgun(player),
      [GunTypes.BAZOOKA]: new Bazooka(player),
      [GunTypes.BULLET_HELL]: new BulletHell(player),
      [GunTypes.CANNON]: new Cannon(player),
      [GunTypes.CROSSBOW]: new Crossbow(player),
      [GunTypes.GRENADE_LAUNCHER]: new GrenadeLauncher(player),
      [GunTypes.MINE_LAUNCHER]: new MineLauncher(player),
      [GunTypes.MINIGUN]: new Minigun(player),
      [GunTypes.NUKE_LAUNCHER]: new NukeLauncher(player),
      [GunTypes.PISTOL]: new Pistol(player),
      [GunTypes.RICOCHET]: new Ricochet(player),
      [GunTypes.SHOTGUN]: new Shotgun(player),
      [GunTypes.SMG]: new SubmachineGun(player),
    };
  }

  randomizeGun() {
    const availableGuns = Object.values(GunTypes);
    const length = availableGuns.length - 1;
    const randomGun = availableGuns[randomInt(0, length)];
    let gun = null;

    switch (randomGun) {
      case GunTypes.ACID_SHOTGUN:
        gun = this.#guns[GunTypes.ACID_SHOTGUN];
        break;
      case GunTypes.BAZOOKA:
        gun = this.#guns[GunTypes.BAZOOKA];
        break;
      case GunTypes.BULLET_HELL:
        gun = this.#guns[GunTypes.BULLET_HELL];
        break;
      case GunTypes.CANNON:
        gun = this.#guns[GunTypes.CANNON];
        break;
      case GunTypes.CROSSBOW:
        gun = this.#guns[GunTypes.CROSSBOW];
        break;
      case GunTypes.GRENADE_LAUNCHER:
        gun = this.#guns[GunTypes.GRENADE_LAUNCHER];
        break;
      case GunTypes.MINE_LAUNCHER:
        gun = this.#guns[GunTypes.MINE_LAUNCHER];
        break;
      case GunTypes.MINIGUN:
        gun = this.#guns[GunTypes.MINIGUN];
        break;
      case GunTypes.NUKE_LAUNCHER:
        gun = this.#guns[GunTypes.NUKE_LAUNCHER];
        break;
      case GunTypes.RICOCHET:
        gun = this.#guns[GunTypes.RICOCHET];
        break;
      case GunTypes.SHOTGUN:
        gun = this.#guns[GunTypes.SHOTGUN];
        break;
      case GunTypes.SMG:
        gun = this.#guns[GunTypes.SMG];
        break;
      default:
        throw new Error("Invalid gun!");
    }

    return gun;
  }

  defaultGun() {
    return this.#guns[GunTypes.PISTOL];
  }
}

export { Arsenal };
