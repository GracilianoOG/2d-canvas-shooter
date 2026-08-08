import * as Damage from "@/game/arsenal/ammo/damages";
import * as Colors from "@/game/constants/colors";

export const ammoData = {
  common: {
    radius: 5,
    speed: 1250,
    color: Colors.WHITE,
    damage: Damage.BASE_DMG,
  },
  cannon: {
    radius: 20,
    speed: 350,
    color: Colors.VERY_LIGHT_YELLOW,
    damage: Damage.CANNON_DMG,
  },
  grenade: {
    radius: 10,
    speed: 500,
    color: Colors.ARMY_GREEN,
    damage: Damage.BASE_DMG,
    fragments: {
      amount: 10,
      type: "common",
    },
  },
  heavy: {
    radius: 5,
    speed: 1250,
    color: Colors.VERY_LIGHT_YELLOW,
    damage: Damage.HEAVY_DMG,
  },
  mine: {
    radius: 6,
    speed: 500,
    color: Colors.ARMY_GREEN,
    damage: Damage.HEAVY_DMG,
    fragments: {
      amount: 16,
      type: "common",
    },
  },
  rocket: {
    radius: 12,
    speed: 400,
    color: Colors.ARMY_GREEN,
    damage: Damage.HEAVY_DMG,
    fragments: {
      amount: 20,
      type: "common",
    },
  },
  nuke: {
    radius: 20,
    speed: 350,
    color: Colors.ARMY_GREEN,
    damage: Damage.CANNON_DMG,
    fragments: {
      amount: 10,
      type: "cannon",
    },
  },
  pierce: {
    radius: 4,
    speed: 1500,
    color: Colors.RED,
    damage: Damage.HEAVY_DMG,
  },
  bouncy: {
    radius: 8,
    speed: 750,
    color: Colors.VIOLET,
    damage: Damage.RICOCHET_DMG,
  },
};
