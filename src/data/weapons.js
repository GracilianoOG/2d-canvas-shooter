import { BulletHell } from "@/scripts/arsenal/guns/BulletHell";
import { Cannon } from "@/scripts/arsenal/guns/Cannon";
import { HeavyShotgun } from "@/scripts/arsenal/guns/HeavyShotgun";
import { Minigun } from "@/scripts/arsenal/guns/Minigun";
import { RicochetShotgun } from "@/scripts/arsenal/guns/RicochetShotgun";
import { Rifle } from "@/scripts/arsenal/guns/Rifle";
import { Shotgun } from "@/scripts/arsenal/guns/Shotgun";
import { SubmachineGun } from "@/scripts/arsenal/guns/SubmachineGun";
import { randomInt } from "@/scripts/utils/utility";

const weapons = {
  minigun: () => new Minigun(),
  shotgun: () => new Shotgun(),
  heavyShotgun: () => new HeavyShotgun(),
  ricochetShotgun: () => new RicochetShotgun(),
  smg: () => new SubmachineGun(),
  rifle: () => new Rifle(),
  hell: () => new BulletHell(),
  cannon: () => new Cannon(),
};

const weaponList = Object.entries(weapons);

export const getRandomWeapon = () => {
  return weaponList[randomInt(0, weaponList.length)];
};
