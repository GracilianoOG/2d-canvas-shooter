import * as Colors from "../utils/constants/colors.js";

// radius, speed, color, hp, score, options
const enemyTypes = [
  [18, 250, Colors.RED, 20, null],
  [14, 312, Colors.PINK, 10, null],
  [25, 187, Colors.LIGHT_BLUE, 30, { aggressive: false }],
  [20, 250, Colors.LIGHT_PURPLE, 30, null],
  [
    30,
    125,
    Colors.GREEN,
    50,
    {
      shrinkable: false,
      aggressive: false,
      bloodAmount: 12,
    },
  ],
  [20, 250, Colors.ALMOST_BLACK, 20, { aggressive: false }],
  [10, 375, Colors.ORANGE, 10, null],
  [
    40,
    62,
    Colors.LIGHT_RED,
    80,
    {
      knockback: false,
      aggressive: false,
      shrinkable: false,
      bloodAmount: 16,
    },
  ],
];

enemyTypes.forEach((type) => {
  const score = {};
  score.hit = type[3] * 10;
  score.death = score.hit * 3;
  type.splice(type.length - 1, 0, score);
});

export { enemyTypes };
