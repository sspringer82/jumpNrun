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
        if (this.isPlayerDead()) {
          this.toggleMoving();
          this.player.die();
        }
      }
    }

    isPlayerDead() {
      const isPlayerInGap = this.platformCollection.platforms
        .filter((platform) => platform instanceof Gap)
        .some(gap => gap.x <= this.player.x && gap.x + gap.width >= this.player.x + this.player.width);
      return isPlayerInGap && this.player.currentState !== Player.jump;
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