class GameLoop {
  constructor() {
    this.state = GameLoop.stateIdle;

    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.propagateState();
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  propagateState() {
    this.subscribers.forEach((subscriber) => {
      subscriber.consumeStateChange(this.state);
    });
  }
}

GameLoop.stateIdle = 'idle';
GameLoop.stateMoving = 'moving';
GameLoop.stateJumping = 'jumping';