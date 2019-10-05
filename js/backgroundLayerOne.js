class BackgroundLayerOne {
  constructor() {
    this.background = new Image();

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');
  }

  init() {
    const promise = new Promise((resolve, reject) => this.background.addEventListener('load', resolve));
    this.background.src = 'assets/background-layer-1.png';

    return promise;
  }

  getName() {
    return 'BackgroundLayerOne';
  }

  getUpdateEvery() {
    return 10000;
  }

  update() {
  }

  draw() {
    this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
  }
}