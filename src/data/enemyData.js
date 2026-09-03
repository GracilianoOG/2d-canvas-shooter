import * as Colors from "@/game/constants/colors";
import { Boomer } from "@/game/entities/enemies/Boomer";
import { Cloaker } from "@/game/entities/enemies/Cloaker";
import { Enemy } from "@/game/entities/enemies/Enemy";
import { Spawner } from "@/game/entities/enemies/Spawner";
import { Void } from "@/game/entities/enemies/Void";

export const enemyData = {
  reddy: {
    radius: 18,
    speed: 250,
    color: Colors.RED,
    hp: 20,
    score: 100,
    options: null,
    dropChance: 0.05,
    orbs: 3,
  },
  pinky: {
    radius: 14,
    speed: 312,
    color: Colors.PINK,
    hp: 10,
    score: 100,
    options: null,
    dropChance: 0.02,
    orbs: 2,
  },
  bluey: {
    radius: 25,
    speed: 187,
    color: Colors.LIGHT_BLUE,
    hp: 30,
    score: 200,
    options: { aggressive: false },
    dropChance: 0.08,
    orbs: 4,
  },
  purply: {
    radius: 20,
    speed: 250,
    color: Colors.LIGHT_PURPLE,
    hp: 30,
    score: 200,
    options: null,
    dropChance: 0.1,
    orbs: 4,
  },
  greeny: {
    radius: 30,
    speed: 125,
    color: Colors.GREEN,
    hp: 40,
    score: 400,
    options: {
      shrinkable: false,
      aggressive: false,
      bloodAmount: 12,
    },
    dropChance: 0.15,
    orbs: 5,
  },
  orangey: {
    radius: 10,
    speed: 375,
    color: Colors.ORANGE,
    hp: 10,
    score: 200,
    options: null,
    dropChance: 0.1,
    orbs: 4,
  },
  lightReddy: {
    radius: 35,
    speed: 90,
    color: Colors.LIGHT_RED,
    hp: 50,
    score: 300,
    options: {
      knockback: false,
      aggressive: false,
      shrinkable: false,
      bloodAmount: 16,
    },
    dropChance: 0.15,
    orbs: 6,
  },
};

export const specialData = {
  wall: {
    Class: Enemy,
    radius: 50,
    speed: 60,
    color: Colors.GOLDEN,
    hp: 80,
    score: 500,
    options: {
      knockback: false,
      aggressive: false,
      shrinkable: false,
      bloodAmount: 16,
    },
    dropChance: 0.25,
    orbs: 10,
  },
  boomer: {
    Class: Boomer,
    radius: 35,
    speed: 80,
    color: Colors.VIOLET,
    hp: 50,
    score: 600,
    options: {
      aggressive: false,
      shrinkable: false,
    },
    dropChance: 0.2,
    orbs: 8,
  },
  spawner: {
    Class: Spawner,
    radius: 35,
    speed: 70,
    color: Colors.VERY_LIGHT_PINK,
    hp: 60,
    score: 600,
    options: {
      aggressive: false,
      shrinkable: false,
      knockback: false,
    },
    dropChance: 0.25,
    orbs: 8,
  },
  void: {
    Class: Void,
    radius: 30,
    speed: 150,
    color: Colors.WHITE,
    hp: 40,
    score: 500,
    options: {
      aggressive: false,
      shrinkable: false,
      grow: true,
    },
    dropChance: 0.15,
    orbs: 7,
  },
  cloaker: {
    Class: Cloaker,
    radius: 20,
    speed: 200,
    color: Colors.VERY_LIGHT_BLUE,
    hp: 30,
    score: 300,
    options: {
      shrinkable: false,
    },
    dropChance: 0.15,
    orbs: 6,
  },
};

export const enemyIds = Object.keys(enemyData);
export const specialIds = Object.keys(specialData);
