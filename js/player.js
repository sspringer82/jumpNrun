class Player {
  constructor() {
    this.stateIdle = 'idle';
    this.stateRunning = 'running';

    this.images = {};

    this.images[this.stateIdle] = new Image();
    this.images[this.stateRunning] = new Image();

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');

    this.sourceWidth = {};
    this.sourceWidth[this.stateIdle] = 1300 / 4;
    this.sourceWidth[this.stateRunning] = 2000 / 6;
    this.sourceHeight = 300;
    this.targetWidth = this.sourceWidth[this.stateIdle] / 2;
    this.targetHeight = this.sourceHeight / 2;

    this.phases = {};
    this.phases[this.stateIdle] = 4;
    this.phases[this.stateRunning] = 6;

    this.currentPhase = 1;
    this.blinkEvery = 3;
    this.lastBlink = 3;

    this.state = this.stateRunning;
  }

  init() {
    const promiseStateIdle = new Promise((resolve) => this.images[this.stateIdle].addEventListener('load', resolve));
    const promiseStateRunning = new Promise((resolve) => this.images[this.stateRunning].addEventListener('load', resolve));

    this.images[this.stateIdle].src = 'assets/Black_Sheep_Idle.png';
    this.images[this.stateRunning].src = 'assets/Black_Sheep_Run.png';

    return Promise.all([promiseStateIdle, promiseStateRunning]);
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
    const y = this.canvas.height - 303;
    const image = this.images[this.state];

    this.context.drawImage(image, sourceStart, 0, this.sourceWidth[this.state], this.sourceHeight, 10, y, this.targetWidth, this.targetHeight);
  }
}