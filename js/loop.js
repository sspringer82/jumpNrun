class Loop {

  constructor(context, player, background, platformCollection, stream) {
    this.context = context;
    this.player = player;
    this.background = background;
    this.platformCollection = platformCollection;
    this.isMoving = false;
    this.stream = stream;
  }

  init(worker) {
    this.worker = worker;
    // event.data = {boolean}
    worker.onmessage = ({ data: isDead }) => {
      if (isDead) {
        this.toggleMoving();
        this.player.die();
      }
    };
  }

  toggleMoving() {
    if (this.isMoving && this.player.currentState === Player.jump || this.player.isDead) {
      return;
    }
    this.isMoving = !this.isMoving;
    this.player.setIsMoving(this.isMoving);
  }

  update(timestamp) {
    this.player.update(timestamp);
    if (this.isMoving) {
      this.platformCollection.update();
      if (this.isPlayerDead()) {
        this.toggleMoving();
        this.player.die();
      }
    }

    this.stream.update(timestamp);
  }

  setSpectatorMode(spectatorMode) {
    this.spectatorMode = spectatorMode;
    this.stream.setSpectatorMode(spectatorMode);
  }

  isPlayerDead() {
    this.worker.postMessage({
      platforms: this.platformCollection.toJSON(),
      player: this.player.toJSON(),
    });
  }

  render() {
    // render all the things
    // render player
    // this.player.x = this.player.x + 1;
    this.background.render(this.context.canvas.width, this.context.canvas.height);
    this.platformCollection.render();
    this.player.render();
  }

  step(timestamp) {
    this.update(timestamp);
    this.render();
    requestAnimationFrame(this.step.bind(this));
  }

}