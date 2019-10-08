class Loop {

    constructor(background, player, platformCollection, stream) {
      this.background = background;
      this.player = player;
      this.platformCollection = platformCollection;
      this.stream = stream;
      this.lastUpdate = 0;
      this.isMoving = false;
      this.spectatorMode = false;
    }

    init(worker) {
      worker.onmessage = ({data: isDead}) => {
        if (isDead) {
          this.toggleMoving();
          this.player.die();
        }
      }
    }

    update(timestamp) {
      this.player.update(timestamp);
      if (this.isMoving) {
        this.platformCollection.update();
  
        this.isPlayerDead();
      }

      this.stream.update(timestamp);
    }

    setSpectatorMode(spectatorMode) {
      this.spectatorMode = spectatorMode;
      this.stream.setSpectatorMode(spectatorMode);
    }

    isPlayerDead() {
      worker.postMessage({
        platforms: this.platformCollection.toJSON(), 
        player: this.player.toJSON()
      });
    }
  
    render() {
      this.background.render();   
      this.platformCollection.render();
      this.player.render();
    }

    toggleMoving() {
      if (this.isMoving && this.player.currentState === Player.jump || this.player.isDead) {
        return;
      }
      this.isMoving = !this.isMoving;
      this.player.toggleMoving(this.isMoving);
    }
    
    step(timestamp) {
      this.update(timestamp);
      this.render();
      requestAnimationFrame(this.step.bind(this));
    }
}