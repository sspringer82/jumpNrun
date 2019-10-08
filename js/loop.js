class Loop {

    constructor(background, player, platformCollection) {
      this.background = background;
      this.player = player;
      this.platformCollection = platformCollection;
      this.lastUpdate = 0;
      this.isMoving = false;
    }

    update(timestamp) {
      this.player.update(timestamp);
      if (this.isMoving) {
        this.platformCollection.update(timestamp);
      }
    }
  
    render() {
      this.background.render();   
      this.platformCollection.render();
      this.player.render();
    }

    toggleMoving() {
      this.isMoving = !this.isMoving;
      this.player.toggleMoving(this.isMoving);
    }
    
    step(timestamp) {
      this.update(timestamp);
      this.render();
      requestAnimationFrame(this.step.bind(this));
    }
}