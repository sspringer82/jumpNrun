class Stream {
  constructor(player, platformCollection) {
    this.player = player;
    this.platformCollection = platformCollection;

    this.lastUpdate = 0;
    this.updateEvery = 20;

    this.socket = new WebSocket('ws://localhost:8081');
    this.isSocketReady = false;

    this.socket.onopen = () => this.isSocketReady = true;
  }
  
  shouldUpdate(timestamp) {
    return timestamp - this.lastUpdate > this.updateEvery;
  }

  update(timestamp) {
    if (this.isSocketReady && this.shouldUpdate(timestamp)) {
      this.socket.send(JSON.stringify({
        player: this.player.toJSON(),
        platforms: this.platformCollection.toJSON()
      }));

      this.lastUpdate = timestamp;
    }
  }
}