class Loop {

    constructor(background, player, platforms) {
      this.background = background;
      this.player = player;
      this.platforms = platforms;
      this.lastUpdate = 0;
    }

    update(timestamp) {
      this.player.update(timestamp);
    }
  
    render() {
        this.background.render();
        this.platforms.forEach((platform) => {
            platform.render();
        });
        this.player.render();
    }
    
    step(timestamp) {
      this.update(timestamp);
      this.render();
      requestAnimationFrame(this.step.bind(this));
    }
}