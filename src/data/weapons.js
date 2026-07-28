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
import { Ricochet } from "@/game/arsenal/guns/Ricochet";
import { ExplosiveShotgun } from "@/game/arsenal/guns/ExplosiveShotgun";
import { Sonar } from "@/game/arsenal/guns/Sonar";
import { Pistol } from "@/game/arsenal/guns/Pistol";

export const weapons = {
  bazooka: new RocketLauncher(),
  broom: new ExplosiveShotgun(),
  bouncy: new RicochetShotgun(),
  cannon: new Cannon(),
  hell: new BulletHell(),
  launcher: new GrenadeLauncher(),
  minigun: new Minigun(),
  mine: new MineLauncher(),
  nuke: new NukeLauncher(),
  pistol: new Pistol(),
  rifle: new Rifle(),
  ricochet: new Ricochet(),
  super: new HeavyShotgun(),
  shotgun: new Shotgun(),
  smg: new SubmachineGun(),
  sonar: new Sonar(),
};

export const weaponIds = Object.keys(weapons).filter((id) => id !== "pistol");
