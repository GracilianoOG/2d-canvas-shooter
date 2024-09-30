import { Howl } from "howler";

import hitOgg from "/audios/sounds/hitHurt.ogg";
import hitMp3 from "/audios/sounds/hitHurt.mp3";

import explosionOgg from "/audios/sounds/explosion.ogg";
import explosionMp3 from "/audios/sounds/explosion.mp3";

import laserOgg from "/audios/sounds/laserShoot.ogg";
import laserMp3 from "/audios/sounds/laserShoot.mp3";

import battleOgg from "/audios/music/battle-loop.ogg";
import battleMp3 from "/audios/music/battle-loop.mp3";

const audios = {
  sounds: {
    hit: new Howl({
      src: [hitOgg, hitMp3]
    }),
    explosion: new Howl({
      src: [explosionOgg, explosionMp3]
    }),
    shot: new Howl({
      src: [laserOgg, laserMp3]
    })
  },
  music: {
    battle: new Howl({
      src: [battleOgg, battleMp3],
      loop: true
    })
  }
};

export default audios;