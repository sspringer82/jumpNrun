class Collision {
  constructor() {
    this.player = null;
    this.platform = null;
    this.gameLoop = null;
    this.canvas = document.getElementById('tutorial');

    this.isOnPlatform = false;
    this.isPlayerDead = false;
  }

  setPlayer(player) {
    this.player = player;
  }

  setPlatform(platform) {
    this.platform = platform;
  }

  setGameLoop(gameLoop) {
    this.gameLoop = gameLoop;
  }

  getName() {
    return 'Collision';
  }

  getUpdateEvery() {
    return 10;
  }

  getIsOnPlatform() {
    return this.isOnPlatform;
  }

  update() {
    this.checkPlayerPlatformCollision();
    if (!this.isOnPlatform) {
      this.checkPlayerDeath();
    }
  }

  checkPlayerPlatformCollision() {
    const playerBox = this.player.getBoundingBox();
    const platforms = this.platform.getBoundingBoxes();

    let isOnPlatform = false;

    platforms.forEach((platform) => {
      const platformX = platform.x - platform.offset;
      if (
        playerBox.x < platformX + platform.width &&
        playerBox.x + playerBox.width > platformX &&
        playerBox.y < platform.y + platform.height &&
        playerBox.y + playerBox.height > platform.y
      ) {
        isOnPlatform = true;
      }
    });

    this.player.setIsOnPlatform(isOnPlatform);
    this.isOnPlatform = isOnPlatform;
  }

  checkPlayerDeath() {
    const playerBox = this.player.getBoundingBox();
    this.isPlayerDead = playerBox.y > this.canvas.height;
    if (this.isPlayerDead) {
      this.gameLoop.setState(GameLoop.stateDead);
    }
  }

  draw() {

  }

  consumeStateChange(state) {}
}