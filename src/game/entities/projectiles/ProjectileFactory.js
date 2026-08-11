import { ammoData } from "@/data/ammoData";
import { Bullet } from "./Bullet";
import { Explosive } from "./Explosive";
import { Flechette } from "./Flechette";
import { Piercing } from "./Piercing";
import { Mine } from "./Mine";
import { AmmoFactory } from "@/game/arsenal/ammo/AmmoFactory";

export class ProjectileFactory {
  static create(type, angle) {
    const { radius, speed, color, damage, fragments } =
      ammoData[type] ?? ammoData["common"];

    switch (type) {
      case "common":
      case "cannon":
      case "heavy":
        return new Bullet(angle, radius, speed, color, damage);
      case "grenade":
      case "rocket":
      case "nuke":
        return new Explosive(angle, radius, speed, color, damage, {
          amount: fragments.amount,
          creator: AmmoFactory.request(fragments.type),
        });
      case "mine":
        return new Mine(angle, radius, speed, color, damage, {
          amount: fragments.amount,
          creator: AmmoFactory.request(fragments.type),
        });
      case "bouncy":
        return new Flechette(angle, radius, speed, color, damage);
      case "pierce":
        return new Piercing(angle, radius, speed, color, damage);
      default:
        console.error("Unknown projectile type: " + type);
        return new Bullet(angle, radius, speed, color, damage);
    }
  }
}
