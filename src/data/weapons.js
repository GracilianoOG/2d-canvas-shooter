import { Minigun } from "@/scripts/arsenal/guns/Minigun";
import { Rifle } from "@/scripts/arsenal/guns/Rifle";
import { Shotgun } from "@/scripts/arsenal/guns/Shotgun";
import { SubmachineGun } from "@/scripts/arsenal/guns/SubmachineGun";
import { randomInt } from "@/scripts/utils/utility";

const weapons = {
  minigun: () => new Minigun(),
  shotgun: () => new Shotgun(),
  smg: () => new SubmachineGun(),
  rifle: () => new Rifle(),
};

const weaponList = Object.entries(weapons);

export const getRandomWeapon = () => {
  return weaponList[randomInt(0, weaponList.length)];
};
