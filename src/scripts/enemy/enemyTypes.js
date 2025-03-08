const enemyTypes = [
  {
    radius: 18,
    speed: 4,
    color: "#ff0000",
    hp: 20,
  },
  {
    radius: 14,
    speed: 5,
    color: "#f210c8",
    hp: 10,
  },
  {
    radius: 25,
    speed: 3,
    color: "#10b2f2",
    hp: 30,
  },
  {
    radius: 20,
    speed: 4,
    color: "#021ffc",
    hp: 30,
  },
  {
    radius: 30,
    speed: 2,
    color: "#1ff40c",
    hp: 50,
  },
  {
    radius: 10,
    speed: 6,
    color: "#fc4d02",
    hp: 10,
  },
];

enemyTypes.forEach(t => {
  t.score = {};
  t.score.hit = t.hp * t.speed;
  t.score.death = t.hp * t.speed * 10;
});

export { enemyTypes };
