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
    this.targetWidth = this.sourceWidth[this.stateIdle] / 2;
    this.targetHeight = this.sourceHeight / 2;

    this.currentPhase = 1;
    this.blinkEvery = 3;
    this.lastBlink = 3;

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

  update() {
    this.currentPhase++;

    if (this.state === this.stateIdle) {
      if (this.lastBlink === 0 && this.currentPhase === this.phases[this.state]) {
        this.lastBlink = this.blinkEvery;
      } else if (this.lastBlink > 0 && this.currentPhase > this.phases[this.state] - 1) {
        this.currentPhase = 1;
        this.lastBlink--;
      }
    } else {
      if (this.currentPhase > this.phases[this.state]) {
        this.currentPhase = 1;
      }
    }
  }

  draw() {
    const sourceStart = (this.currentPhase * this.sourceWidth[this.state]) - this.sourceWidth[this.state];
    let y = this.canvas.height - 303;
    if (this.state === this.stateJumping) {
      y = y - 100;
    }
    const image = this.images[this.state];

    this.context.drawImage(image, sourceStart, 0, this.sourceWidth[this.state], this.sourceHeight, 10, y, this.targetWidth, this.targetHeight);
  }
}