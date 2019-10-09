class Background {
  constructor(context) {
    this.context = context;

    this.image = new Image();
    
  }

  init() {
    return new Promise((resolve) => {
      this.image.src = 'assets/background1.png';

      this.image.addEventListener('load', resolve);
    });
  }

  render(width, height) {
    this.context.drawImage(this.image, 0, 0, width, height);
  }

}