import { Gun } from "@/game/arsenal/guns/Gun";
import { weaponData } from "./weaponData";

export const weapons = {
  bazooka: new Gun(weaponData.bazooka),
  broom: new Gun(weaponData.broom),
  bouncy: new Gun(weaponData.bouncy),
  cannon: new Gun(weaponData.cannon),
  hell: new Gun(weaponData.hell),
  launcher: new Gun(weaponData.launcher),
  minigun: new Gun(weaponData.minigun),
  mine: new Gun(weaponData.mine),
  nuke: new Gun(weaponData.nuke),
  pistol: new Gun(weaponData.pistol),
  rifle: new Gun(weaponData.rifle),
  ricochet: new Gun(weaponData.ricochet),
  super: new Gun(weaponData.super),
  shotgun: new Gun(weaponData.shotgun),
  smg: new Gun(weaponData.smg),
  sonar: new Gun(weaponData.sonar),
  that: new Gun(weaponData.that),
};
