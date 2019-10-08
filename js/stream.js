class Stream {
  constructor(player, platformCollection) {
    this.player = player;
    this.platformCollection = platformCollection;

    this.lastUpdate = 0;
    this.updateEvery = 20;

    this.socket = new WebSocket('ws://localhost:8081');
    this.spectatorMode = false;
    this.isSocketReady = false;

    this.socket.onopen = () => this.isSocketReady = true;
  }

  setSpectatorMode(spectatorMode) {
    this.spectatorMode = spectatorMode;

    if (spectatorMode) {      
      this.socket.onmessage = (event) => {
        const {player, platforms} = JSON.parse(event.data);
        this.player.updatePosition(player.x, player.y);
        this.player.updateState(player.currentState);
        if (player.currentState === Player.jump) {
          this.player.jump();
        }
        this.platformCollection.updateFromJson(platforms);
      }
    } else {
      this.socket.onmessage = () => {}; 
    }
  }

  shouldUpdate(timestamp) {
    return timestamp - this.lastUpdate > this.updateEvery;
  }

  update(timestamp) {
    if (!this.spectatorMode && this.isSocketReady && this.shouldUpdate(timestamp)) {
      this.socket.send(JSON.stringify({
        player: this.player.toJSON(),
        platforms: this.platformCollection.toJSON()
      }));

      this.lastUpdate = timestamp;
    }
  }
}