const soundPath = "./src/assets/audios/sounds/";
const musicPath = "./src/assets/audios/music/";

const audios = {
  sounds: {
    hit: new Howl({
      src: [`${soundPath}hitHurt.ogg`, `${soundPath}hitHurt.mp3`]
    }),
    explosion: new Howl({
      src: [`${soundPath}explosion.ogg`, `${soundPath}explosion.mp3`]
    }),
    shot: new Howl({
      src: [`${soundPath}laserShoot.ogg`, `${soundPath}laserShoot.mp3`]
    })
  },
  music: {
    battle: new Howl({
      src: [`${musicPath}battle-loop.ogg`, `${musicPath}battle-loop.mp3`],
      loop: true
    })
  }
};

export default audios;