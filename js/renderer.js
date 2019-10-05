class Renderer {
  constructor() {
    this.lastUpdate = {};
    this.subscribers = [];

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

  draw() {
    this.subscribers.forEach((subscriber) => {
      if (this.shallUpdate(subscriber)) {
        this.updateLastUpdate(subscriber);
        subscriber.draw();
      }
    });

    window.requestAnimationFrame(this.draw.bind(this));
  }
}