class Gap {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    
    this.x = 0;
    this.y = 0;
    this.height = 260;
    this.width = 282;
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