import { BulletHell } from "@/game/arsenal/guns/BulletHell";
import { Cannon } from "@/game/arsenal/guns/Cannon";
import { GrenadeLauncher } from "@/game/arsenal/guns/GrenadeLauncher";
import { HeavyShotgun } from "@/game/arsenal/guns/HeavyShotgun";
import { MineLauncher } from "@/game/arsenal/guns/MineLauncher";
import { Minigun } from "@/game/arsenal/guns/Minigun";
import { NukeLauncher } from "@/game/arsenal/guns/NukeLauncher";
import { RicochetShotgun } from "@/game/arsenal/guns/RicochetShotgun";
import { Rifle } from "@/game/arsenal/guns/Rifle";
import { RocketLauncher } from "@/game/arsenal/guns/RocketLauncher";
import { Shotgun } from "@/game/arsenal/guns/Shotgun";
import { SubmachineGun } from "@/game/arsenal/guns/SubmachineGun";
import { randomInt } from "@/engine/utils/math";
import { Ricochet } from "@/game/arsenal/guns/Ricochet";

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
  ricochet: () => new Ricochet(),
};

const weaponList = Object.entries(weapons);

export const getRandomWeapon = () => {
  return weaponList[randomInt(weaponList.length)];
};
