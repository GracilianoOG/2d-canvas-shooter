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
  #context;

  constructor() {
    this.#audios = new Map();
    this.#context = new AudioContext();
    this.load("hit", hitOgg);
    this.load("explosion", explosionOgg);
    this.load("shot", laserOgg);
    this.load("battle", battleOgg);
  }

  async load(name, audio) {
    const response = await fetch(audio);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.#context.decodeAudioData(arrayBuffer);

    this.#audios.set(name, audioBuffer);
  }

  play(name) {
    const source = this.#context.createBufferSource();
    const audioBuffer = this.#audios.get(name);
    source.buffer = audioBuffer;
    source.connect(this.#context.destination);
    source.start();
  }
}

export { AudioSystem };
