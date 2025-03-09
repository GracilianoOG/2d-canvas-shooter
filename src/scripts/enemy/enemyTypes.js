const enemyTypes = [
  {
    radius: 18,
    speed: 4,
    color: "#ff2d2d",
    hp: 20,
  },
  {
    radius: 14,
    speed: 5,
    color: "#f547d7",
    hp: 10,
  },
  {
    radius: 25,
    speed: 3,
    color: "#60cdf7",
    hp: 30,
  },
  {
    radius: 20,
    speed: 4,
    color: "#8191fe",
    hp: 30,
  },
  {
    radius: 30,
    speed: 2,
    color: "#42fd9b",
    hp: 50,
  },
  {
    radius: 10,
    speed: 6,
    color: "#fd7840",
    hp: 10,
  },
];

enemyTypes.forEach(t => {
  t.score = {};
  t.score.hit = t.hp * t.speed;
  t.score.death = t.hp * t.speed * 10;
});

export { enemyTypes };
