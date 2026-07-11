import hitOgg from "/assets/audios/sounds/hitHurt.ogg";
import hitMp3 from "/assets/audios/sounds/hitHurt.mp3";

import explosionOgg from "/assets/audios/sounds/explosion.ogg";
import explosionMp3 from "/assets/audios/sounds/explosion.mp3";

import laserOgg from "/assets/audios/sounds/laserShoot.ogg";
import laserMp3 from "/assets/audios/sounds/laserShoot.mp3";

import battleOgg from "/assets/audios/music/battle-loop.ogg";
import battleMp3 from "/assets/audios/music/battle-loop.mp3";

const audios = {
  hit: [hitOgg, hitMp3],
  explosion: [explosionOgg, explosionMp3],
  shot: [laserOgg, laserMp3],
  battle: [battleOgg, battleMp3],
};

export default audios;
