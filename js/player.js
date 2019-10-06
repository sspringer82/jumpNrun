class Player {
  constructor() {
    this.image = new Image();

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');

    this.sourceWidth = 325;
    this.sourceHeight = 300;
    this.targetWidth = this.sourceWidth / 2;
    this.targetHeight = this.sourceHeight / 2;

    this.phases = 4;
    this.currentPhase = 1;
    this.blinkEvery = 3;
    this.lastBlink = 3;

    this.state = 'idle';
  }

  init() {
    const promise = new Promise((resolve) => this.image.addEventListener('load', resolve));
    this.image.src = 'assets/Black_Sheep_Idle.png';

    return promise;
  }

  getName() {
    return 'Player';
  }

  getUpdateEvery() {
    if (this.state === 'idle') {
      return 200;
    }
  }

  update() {
    this.currentPhase++;

    if (this.lastBlink === 0 && this.currentPhase === this.phases) {
      this.lastBlink = this.blinkEvery;
    } else if (this.lastBlink > 0 && this.currentPhase > this.phases - 1) {
      this.currentPhase = 1;
      this.lastBlink--;
    }
  }

  draw() {
    const sourceStart = (this.currentPhase * this.sourceWidth) - this.sourceWidth;
    const y = this.canvas.height - 303;
    this.context.drawImage(this.image, sourceStart, 0, this.sourceWidth, this.sourceHeight, 0, y, this.targetWidth, this.targetHeight);
  }
}