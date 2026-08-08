import { Shotgun } from "@/game/arsenal/guns/Shotgun";
import { Gun } from "@/game/arsenal/guns/Gun";
import { weaponData } from "./weaponData";
import { BulletHell } from "@/game/arsenal/guns/BulletHell";

export const weapons = {
  bazooka: new Gun(weaponData.bazooka),
  broom: new Shotgun(weaponData.broom),
  bouncy: new Shotgun(weaponData.bouncy),
  cannon: new Gun(weaponData.cannon),
  hell: new BulletHell(weaponData.hell),
  launcher: new Gun(weaponData.launcher),
  minigun: new Gun(weaponData.minigun),
  mine: new Gun(weaponData.mine),
  nuke: new Gun(weaponData.nuke),
  pistol: new Gun(weaponData.pistol),
  rifle: new Gun(weaponData.rifle),
  ricochet: new Gun(weaponData.ricochet),
  super: new Shotgun(weaponData.super),
  shotgun: new Shotgun(weaponData.shotgun),
  smg: new Gun(weaponData.smg),
  sonar: new Shotgun(weaponData.sonar),
  that: new Shotgun(weaponData.that),
};

export const weaponIds = Object.keys(weapons).filter((id) => id !== "pistol");
