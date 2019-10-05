class BackgroundLayerFour {
  constructor() {
    this.background = new Image();

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');

    this.offset = 0;
  }

  init() {
    const promise = new Promise((resolve, reject) => this.background.addEventListener('load', resolve));
    this.background.src = 'assets/background-layer-4.png';

    return promise;
  }

  getName() {
    return 'BackgroundLayerFour';
  }

  getUpdateEvery() {
    return 10;
  }

  moveContext() {
    this.context.translate(-this.offset, 0);
  }

  update() {
    if (this.offset >= this.background.width) {
      this.offset = 0;
    } else {
      this.offset = this.offset + 2;
    }
  }

  draw() {
    this.context.save();

    this.moveContext();
    this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();

    this.context.drawImage(this.background, this.background.width - this.offset, 0, this.canvas.width, this.canvas.height);
  }
}