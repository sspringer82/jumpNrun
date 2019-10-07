class Background {
  constructor(context) {
    this.context = context;
    this.image = new Image();
  }

  init() {
    const promise = new Promise((resolve) => this.image.addEventListener('load', () => resolve()));
    this.image.src = 'assets/background1.png';

    return promise;
  }

  render() {
    const {width, height} = this.context.canvas;
    this.context.drawImage(this.image, 0, 0, width, height);
  }
}