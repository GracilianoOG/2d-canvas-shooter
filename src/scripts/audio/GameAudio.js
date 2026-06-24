import audios from "@/data/audios";

class GameAudio {
  #audios;

  constructor() {
    this.#audios = audios;
    Howler.volume(0.4);
  }

  playSound(soundName) {
    this.#audios.sounds[soundName].play();
  }

  playMusic(musicName) {
    this.#audios.music[musicName].play();
  }
}

export { GameAudio };
