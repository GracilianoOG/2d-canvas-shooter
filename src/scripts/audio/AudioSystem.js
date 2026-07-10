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
  #master;
  #sfx;
  #music;

  constructor() {
    this.#audios = new Map();
    this.#context = new AudioContext();

    this.#sfx = this.#context.createGain();
    this.#music = this.#context.createGain();
    this.#master = this.#context.createGain();

    this.#sfx.connect(this.#master);
    this.#music.connect(this.#master);
    this.#master.connect(this.#context.destination);

    this.#master.gain.value = 1;
    this.#sfx.gain.value = 0.5;
    this.#music.gain.value = 0.8;

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

  #prepareSourceBuffer(name, gain) {
    const source = this.#context.createBufferSource();
    const audioBuffer = this.#audios.get(name);
    source.buffer = audioBuffer;
    source.connect(gain);
    return source;
  }

  play(name) {
    const source = this.#prepareSourceBuffer(name, this.#sfx);
    source.start();
  }

  playMusic(name) {
    const source = this.#prepareSourceBuffer(name, this.#music);
    source.loop = true;
    source.start();
  }
}

export { AudioSystem };
