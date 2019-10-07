class Music {
  constructor() {
    this.state = GameLoop.stateIdle;

    this.audio = new Audio('audio/music.mp3');
    this.audio.autoplay = false;
    this.audio.load();
  }

  consumeStateChange(state) {
    if (state === GameLoop.stateMoving && this.state !== GameLoop.stateMoving) {
      this.audio.loop = true;
      this.audio.currentTime = 0;
      this.audio.play();

      this.state = state;
    } else if (state === GameLoop.stateIdle) {
      this.audio.pause();

      this.state = state;
    } else if (state === GameLoop.stateJumping) {
      this.state = GameLoop.stateMoving;
    }
  }
}