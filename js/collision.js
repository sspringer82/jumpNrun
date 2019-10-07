class Collision {
  constructor() {
    this.player = null;
    this.platform = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  setPlatform(platform) {
    this.platform = platform;
  }

  getName() {
    return 'Collision';
  }

  getUpdateEvery() {
    return 3000;
  }

  update() {
    const playerBox = this.player.getBoundingBox();
    const platforms = this.platform.getBoundingBoxes();

    // console.log(platforms);
    // console.log('player: ', playerBox.x);

    platforms.forEach((platform) => {
      const platformX = platform.x - platform.offset;
      // console.log('platform: ', platformX);
      if (
        playerBox.x < platformX + platform.width &&
        playerBox.x + playerBox.width > platformX &&
        playerBox.y < platform.y + platform.height &&
        playerBox.y + playerBox.height > platform.y
      ) {
        // console.log('collision');
        // console.log('platform: ', platformX);
      } else {
        // console.log('no collision');
        // console.log('platform: ', platformX);
      }
    })
  }

  draw() {

  }

  consumeStateChange(state) {}
}