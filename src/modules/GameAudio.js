class GameAudio {  
  #audios;

  constructor(audios) {
    this.#audios = audios;
    Howler.volume(.8);
  }

  playSound(soundName) {
    this.#audios.sounds[soundName].play();
  }

  playMusic(musicName) {
    this.#audios.music[musicName].play();
  }
}

export { GameAudio };