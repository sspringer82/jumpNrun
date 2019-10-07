class Death {
  constructor() {
    this.audio = new Audio('audio/drop.wav');
    this.audio.autoplay = false;
    this.audio.load();

    this.state = GameLoop.stateIdle;
  }

  consumeStateChange(state) {
    if (state === GameLoop.stateDead && this.state !== GameLoop.stateDead) {
      this.audio.currentTime = 0;
      this.audio.play();
    }

    this.state = state;
  }
}