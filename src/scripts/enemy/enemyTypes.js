import * as Colors from "../utils/constants/colors.js";

const enemyTypes = [
  {
    radius: 18,
    speed: 4,
    color: Colors.RED,
    hp: 20,
  },
  {
    radius: 14,
    speed: 5,
    color: Colors.PINK,
    hp: 10,
  },
  {
    radius: 25,
    speed: 3,
    color: Colors.LIGHT_BLUE,
    hp: 30,
  },
  {
    radius: 20,
    speed: 4,
    color: Colors.LIGHT_PURPLE,
    hp: 30,
  },
  {
    radius: 30,
    speed: 2,
    color: Colors.GREEN,
    hp: 50,
  },
  {
    radius: 10,
    speed: 6,
    color: Colors.ORANGE,
    hp: 10,
  },
];

enemyTypes.forEach(t => {
  t.score = {};
  t.score.hit = t.hp * t.speed;
  t.score.death = t.hp * t.speed * 10;
});

export { enemyTypes };
