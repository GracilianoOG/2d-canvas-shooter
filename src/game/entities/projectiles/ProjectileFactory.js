import { ammoData } from "@/data/ammoData";
import { Bullet } from "./Bullet";
import { Explosive } from "./Explosive";
import { Flechette } from "./Flechette";
import { Piercing } from "./Piercing";
import { Mine } from "./Mine";
import { AmmoCreator } from "@/game/arsenal/ammo/AmmoCreator";
import { AmmoFactory } from "@/game/arsenal/ammo/AmmoFactory";

export class ProjectileFactory {
  static create(type, x, y, angle) {
    const { radius, speed, color, damage, fragments } =
      ammoData[type] ?? ammoData["common"];

    switch (type) {
      case "common":
      case "cannon":
      case "heavy":
        return new Bullet(x, y, radius, speed, angle, color, damage);
      case "grenade":
      case "rocket":
      case "nuke":
        return new Explosive(x, y, radius, speed, angle, color, damage, {
          amount: fragments.amount,
          createFragments: (x, y, angle) =>
            AmmoFactory.request(fragments.type).create(x, y, angle),
        });
      case "mine":
        return new Mine(x, y, radius, speed, angle, color, damage, {
          amount: fragments.amount,
          createFragments: (x, y, angle) =>
            AmmoFactory.request(fragments.type).create(x, y, angle),
        });
      case "bouncy":
        return new Flechette(x, y, radius, speed, angle, color, damage);
      case "pierce":
        return new Piercing(x, y, radius, speed, angle, color, damage);
      default:
        console.error("Unknown projectile type: " + type);
        return new Bullet(x, y, radius, speed, angle, color, damage);
    }
  }
}
