class BackgroundLayerTwo {
  constructor() {
    this.background = new Image();

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');

    this.offset = 0;
  }

  init() {
    const promise = new Promise((resolve, reject) => this.background.addEventListener('load', resolve));
    this.background.src = 'assets/background-layer-2.png';

    return promise;
  }

  getName() {
    return 'BackgroundLayerTwo';
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
      this.offset = this.offset + 0.5;
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