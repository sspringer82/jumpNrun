class Jump {
  constructor() {
    this.audio = new Audio('audio/jump2.wav');
    this.audio.autoplay = false;
    this.audio.load();
  }

  consumeStateChange(state) {
    if (state === GameLoop.stateJumping) {
      this.audio.loop = false;
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }
}