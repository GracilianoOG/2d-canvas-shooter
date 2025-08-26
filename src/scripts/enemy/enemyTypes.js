import * as Colors from "../utils/constants/colors.js";

const enemyTypes = [
  {
    radius: 18,
    speed: 250,
    color: Colors.RED,
    hp: 20,
  },
  {
    radius: 14,
    speed: 312,
    color: Colors.PINK,
    hp: 10,
  },
  {
    radius: 25,
    speed: 187,
    color: Colors.LIGHT_BLUE,
    hp: 30,
    options: {
      aggressive: false,
    },
  },
  {
    radius: 20,
    speed: 250,
    color: Colors.LIGHT_PURPLE,
    hp: 30,
  },
  {
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
  {
    radius: 20,
    speed: 250,
    color: Colors.ALMOST_BLACK,
    hp: 20,
    options: {
      aggressive: false,
    },
  },
  {
    radius: 10,
    speed: 375,
    color: Colors.ORANGE,
    hp: 10,
  },
  {
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
];

enemyTypes.forEach(t => {
  t.score = {};
  t.score.hit = t.hp * t.speed;
  t.score.death = t.hp * t.speed * 10;
});

export { enemyTypes };
