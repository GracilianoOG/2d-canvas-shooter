import { ammoData, fragmentData } from "@/data/ammoData";
import { Bullet } from "./Bullet";
import { Explosive } from "./Explosive";
import { Flechette } from "./Flechette";
import { Piercing } from "./Piercing";
import { Mine } from "./Mine";
import { AmmoFactory } from "@/game/arsenal/ammo/AmmoFactory";

export class ProjectileFactory {
  static #setupFragments(type) {
    return {
      amount: fragmentData[type].amount,
      creator: AmmoFactory.request(fragmentData[type].type),
    };
  }

  static create(type, angle) {
    const data = ammoData[type] ?? ammoData["common"];

    switch (type) {
      case "common":
      case "cannon":
      case "heavy":
        return new Bullet(angle, data);
      case "grenade":
      case "rocket":
      case "nuke":
        return new Explosive(
          angle,
          data,
          ProjectileFactory.#setupFragments(type),
        );
      case "mine":
        return new Mine(angle, data, ProjectileFactory.#setupFragments(type));
      case "bouncy":
        return new Flechette(angle, data);
      case "pierce":
        return new Piercing(angle, data);
      default:
        console.error("Unknown projectile type: " + type);
        return new Bullet(angle, data);
    }
  }
}
