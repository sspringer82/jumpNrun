class Music {
  constructor() {
    this.state = GameLoop.stateIdle;

    this.audio = new Audio('audio/music2.wav');
    this.audio.autoplay = false;
    this.audio.load();
    this.audio.loop = true;
  }

  consumeStateChange(state) {
    if (state === GameLoop.stateMoving && this.state !== GameLoop.stateMoving) {
      this.audio.currentTime = 0;
      this.audio.play();

      this.state = state;
    } else if (state === GameLoop.stateIdle || state === GameLoop.stateDead) {
      this.audio.pause();

      this.state = state;
    } else if (state === GameLoop.stateJumping) {
      this.state = GameLoop.stateMoving;
    }
  }
}