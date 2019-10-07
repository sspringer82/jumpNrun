class Player {
  constructor() {
    this.stateIdle = 'idle';
    this.stateRunning = 'running';
    this.stateJumping = 'jumping';

    this.images = {};

    this.images[this.stateIdle] = new Image();
    this.images[this.stateRunning] = new Image();
    this.images[this.stateJumping] = new Image();

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');

    this.phases = {};
    this.phases[this.stateIdle] = 4;
    this.phases[this.stateRunning] = 6;
    this.phases[this.stateJumping] = 8;

    this.sourceWidth = {};
    this.sourceWidth[this.stateIdle] = 1300 / this.phases[this.stateIdle];
    this.sourceWidth[this.stateRunning] = 2000 / this.phases[this.stateRunning];
    this.sourceWidth[this.stateJumping] = 2800 / this.phases[this.stateJumping];
    this.sourceHeight = 500;
    this.targetWidth = this.sourceWidth[this.stateIdle] / 3;
    this.targetHeight = this.sourceHeight / 3;

    this.currentPhase = 1;
    this.blinkEvery = 3;
    this.lastBlink = 3;
    this.isOnPlatform = true;

    this.y = this.canvas.height - 283;
    this.x = 10;

    this.state = this.stateIdle;
  }

  init() {
    const promiseStateIdle = new Promise((resolve) => this.images[this.stateIdle].addEventListener('load', resolve));
    const promiseStateRunning = new Promise((resolve) => this.images[this.stateRunning].addEventListener('load', resolve));
    const promiseStateJumping = new Promise((resolve) => this.images[this.stateJumping].addEventListener('load', resolve));

    this.images[this.stateIdle].src = 'assets/Black_Sheep_Idle.png';
    this.images[this.stateRunning].src = 'assets/Black_Sheep_Run.png';
    this.images[this.stateJumping].src = 'assets/Black_Sheep_Jump.png';

    return Promise.all([promiseStateIdle, promiseStateRunning, promiseStateJumping]);
  }

  getName() {
    return 'Player';
  }

  getUpdateEvery() {
    switch(this.state) {
      case this.stateIdle:
        return 200;

      case this.stateRunning:
        return 100;

      case this.stateJumping:
        return 100;
    }
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.targetWidth,
      height: this.targetHeight
    }
  }

  consumeStateChange(state) {}

  setState(state) {
    if (this.state === this.stateJumping && this.currentPhase < this.phases[this.stateJumping]) {
      return;
    }
    this.state = state;
    this.currentPhase = 1;
  }

  update() {
    this.currentPhase++;

    switch(this.state) {
      case this.stateIdle:
        if (this.lastBlink === 0 && this.currentPhase === this.phases[this.state]) {
          this.lastBlink = this.blinkEvery;
        } else if (this.lastBlink > 0 && this.currentPhase > this.phases[this.state] - 1) {
          this.currentPhase = 1;
          this.lastBlink--;
        }
        break;

      case this.stateJumping:
        if (this.currentPhase > this.phases[this.state]) {
          this.setState(this.stateRunning);
          this.currentPhase = 1;
        }
        break;

      default:
        if (this.currentPhase > this.phases[this.state]) {
          this.currentPhase = 1;
        }
        break;
    }
  }

  setIsOnPlatform(isOnPlatform) {
    this.isOnPlatform = isOnPlatform;
  }

  draw() {
    const sourceStart = (this.currentPhase * this.sourceWidth[this.state]) - this.sourceWidth[this.state];
    let y = this.y;
    if (this.state === this.stateJumping) {
      y = y - 100;
    }

    if (!this.isOnPlatform && this.state !== this.stateJumping) {
      y = y * 1.0981;
      this.y = y;
    }

    const image = this.images[this.state];

    this.context.drawImage(image, sourceStart, 0, this.sourceWidth[this.state], this.sourceHeight, this.x, y, this.targetWidth, this.targetHeight);
  }
}