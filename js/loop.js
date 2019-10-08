class Loop {

    constructor(background, player, platformCollection) {
      this.background = background;
      this.player = player;
      this.platformCollection = platformCollection;
      this.lastUpdate = 0;
      this.isMoving = false;

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
        this.platformCollection.update(timestamp);
        this.isPlayerDead();
      }
    }

    isPlayerDead() {
      worker.postMessage({
        platforms: this.platformCollection.platforms.map(platform => platform.toJSON()), 
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