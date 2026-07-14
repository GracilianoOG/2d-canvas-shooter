import { BulletHell } from "@/scripts/arsenal/guns/BulletHell";
import { Cannon } from "@/scripts/arsenal/guns/Cannon";
import { GrenadeLauncher } from "@/scripts/arsenal/guns/GrenadeLauncher";
import { HeavyShotgun } from "@/scripts/arsenal/guns/HeavyShotgun";
import { MineLauncher } from "@/scripts/arsenal/guns/MineLauncher";
import { Minigun } from "@/scripts/arsenal/guns/Minigun";
import { NukeLauncher } from "@/scripts/arsenal/guns/NukeLauncher";
import { RicochetShotgun } from "@/scripts/arsenal/guns/RicochetShotgun";
import { Rifle } from "@/scripts/arsenal/guns/Rifle";
import { RocketLauncher } from "@/scripts/arsenal/guns/RocketLauncher";
import { Shotgun } from "@/scripts/arsenal/guns/Shotgun";
import { SubmachineGun } from "@/scripts/arsenal/guns/SubmachineGun";
import { randomInt } from "@/scripts/utils/math";

const weapons = {
  minigun: () => new Minigun(),
  shotgun: () => new Shotgun(),
  heavyShotgun: () => new HeavyShotgun(),
  ricochetShotgun: () => new RicochetShotgun(),
  smg: () => new SubmachineGun(),
  rifle: () => new Rifle(),
  hell: () => new BulletHell(),
  cannon: () => new Cannon(),
  nuke: () => new NukeLauncher(),
  launcher: () => new GrenadeLauncher(),
  bazooka: () => new RocketLauncher(),
  mine: () => new MineLauncher(),
};

const weaponList = Object.entries(weapons);

export const getRandomWeapon = () => {
  return weaponList[randomInt(weaponList.length)];
};
