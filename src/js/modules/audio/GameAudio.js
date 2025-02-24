import audios from "./audios.js";

class GameAudio {  
  #audios;

  constructor() {
    this.#audios = audios;
    Howler.volume(.4);
  }

  playSound(soundName) {
    this.#audios.sounds[soundName].play();
  }

  playMusic(musicName) {
    this.#audios.music[musicName].play();
  }
}

export { GameAudio };