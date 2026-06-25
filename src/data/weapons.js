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
import { Ricochet } from "@/scripts/arsenal/guns/Ricochet";
import { Shotgun } from "@/scripts/arsenal/guns/Shotgun";
import { SubmachineGun } from "@/scripts/arsenal/guns/SubmachineGun";
import { randomInt } from "@/scripts/utils/utility";

const weapons = {
  acid: AcidShotgun,
  bazooka: Bazooka,
  hell: BulletHell,
  cannon: Cannon,
  crossbow: Crossbow,
  flechette: FlechetteShotgun,
  launcher: GrenadeLauncher,
  mine: MineLauncher,
  minigun: Minigun,
  nuke: NukeLauncher,
  ricochet: Ricochet,
  shotgun: Shotgun,
  smg: SubmachineGun,
};

const weaponList = Object.entries(weapons);

export const getRandomWeapon = () => {
  return weaponList[randomInt(0, weaponList.length - 1)];
};
