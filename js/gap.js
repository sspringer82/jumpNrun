class Gap {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    
    this.x = 0;
    this.y = 0;
    this.height = 130;
    this.width = 141;
  }

  init() {
    return Promise.resolve();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
  }
}