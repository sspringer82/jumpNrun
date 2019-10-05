class Renderer {
  constructor() {
    this.lastUpdate = {};
    this.subscribers = [];

    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');

    window.requestAnimationFrame(this.draw.bind(this));
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    this.updateLastUpdate(subscriber);
  }

  getCurrentTime() {
    return new Date().getTime();
  };

  shallUpdate(subscriber) {
    const currentTime = this.getCurrentTime();
    const timeDelta = currentTime - this.lastUpdate[subscriber.getName()];

    return timeDelta >= subscriber.getUpdateEvery();
  };

  updateLastUpdate(subscriber) {
    this.lastUpdate[subscriber.getName()] = this.getCurrentTime();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  draw() {
    this.clearCanvas();

    this.subscribers.forEach((subscriber) => {
      if (this.shallUpdate(subscriber)) {
        this.updateLastUpdate(subscriber);
        subscriber.update();
      }
      subscriber.draw();
    });

    window.requestAnimationFrame(this.draw.bind(this));
  }
}