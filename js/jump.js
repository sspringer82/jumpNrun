class Jump {
  constructor() {
    this.audio = new Audio('audio/jump2.wav');
    this.audio.autoplay = false;
    this.audio.load();

    this.state = GameLoop.stateIdle;
  }

  consumeStateChange(state) {
    if (state === GameLoop.stateJumping) {
      this.audio.loop = false;
      this.audio.currentTime = 0;
      this.audio.play();
    }

    this.state = state;
  }
}