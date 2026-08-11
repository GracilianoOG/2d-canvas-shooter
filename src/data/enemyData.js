import * as Colors from "@/game/constants/colors";

export const enemyData = {
  reddy: {
    radius: 18,
    speed: 250,
    color: Colors.RED,
    hp: 20,
    options: null,
  },
  pinky: {
    radius: 14,
    speed: 312,
    color: Colors.PINK,
    hp: 10,
    options: null,
  },
  bluey: {
    radius: 25,
    speed: 187,
    color: Colors.LIGHT_BLUE,
    hp: 30,
    options: { aggressive: false },
  },
  purply: {
    radius: 20,
    speed: 250,
    color: Colors.LIGHT_PURPLE,
    hp: 30,
    options: null,
  },
  greeny: {
    radius: 30,
    speed: 125,
    color: Colors.GREEN,
    hp: 50,
    options: {
      shrinkable: false,
      aggressive: false,
      bloodAmount: 12,
    },
  },
  blacky: {
    radius: 20,
    speed: 250,
    color: Colors.ALMOST_BLACK,
    hp: 20,
    options: { aggressive: false },
  },
  orangey: {
    radius: 10,
    speed: 375,
    color: Colors.ORANGE,
    hp: 10,
    options: null,
  },
  lightReddy: {
    radius: 40,
    speed: 62,
    color: Colors.LIGHT_RED,
    hp: 80,
    options: {
      knockback: false,
      aggressive: false,
      shrinkable: false,
      bloodAmount: 16,
    },
  },
};

export const enemyIds = Object.keys(enemyData);
