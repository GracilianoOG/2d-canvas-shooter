import hitOgg from "/assets/audios/sounds/hitHurt.ogg";
import hitMp3 from "/assets/audios/sounds/hitHurt.mp3";

import explosionOgg from "/assets/audios/sounds/explosion.ogg";
import explosionMp3 from "/assets/audios/sounds/explosion.mp3";

import laserOgg from "/assets/audios/sounds/laserShoot.ogg";
import laserMp3 from "/assets/audios/sounds/laserShoot.mp3";

import battleOgg from "/assets/audios/music/battle-loop.ogg";
import battleMp3 from "/assets/audios/music/battle-loop.mp3";

class AudioSystem {
  #audios;

  constructor() {
    this.#audios = new Map();
    this.load("hit", new Audio(hitOgg));
    this.load("explosion", new Audio(explosionOgg));
    this.load("shot", new Audio(laserOgg));
    this.load("battle", new Audio(battleOgg));
  }

  load(name, audio) {
    this.#audios.set(name, audio);
  }

  play(name) {
    const audio = this.#audios.get(name);
    audio.cloneNode().play();
  }
}

export { AudioSystem };
