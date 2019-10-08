class PlatformCollection {

  constructor(context) {
    this.context = context;
    this.platforms = [];
    this.updateEvery = 35;
    this.y = 282;
    this.count = 0;
  }

  init() {
    this.platforms = [
      new Platform(this.context),
      new Gap(this.context),
      new Platform(this.context),
      new Platform(this.context),
      new Gap(this.context),
      new Platform(this.context),
      new Platform(this.context),
      new Platform(this.context),
      new Gap(this.context),
      new Platform(this.context),
    ];
    
    const initializedPlatforms = this.platforms.map((platform) => platform.init());
  
    return Promise.all(initializedPlatforms).then(() => {
      this.platforms.forEach((platform, index) => {
        platform.updatePosition(index * platform.width, this.y);
      });
    });
  }

  update() {
    this.platforms.forEach((platform, index) => {
      if (platform.x + platform.width < 0) {
        const p = this.platforms.splice(index, 1)[0];
        const lastPlatform = this.platforms[this.platforms.length - 1];
        p.updatePosition(lastPlatform.x + lastPlatform.width, p.y);
        this.platforms.push(p)
      } else {
        platform.updatePosition(platform.x - 5, platform.y);
      }
    });
  }

  updateFromJson(jsonData) {
    this.platforms = [];
    jsonData.forEach((platformData, index) => {
      if (platformData.type === 'platform') {
        const platform = new Platform(this.context);
        platform.init().then(() => platform.updatePosition(platformData.x, platformData.y));
        this.platforms[index] = platform;
      } else {
        const gap = new Gap(this.context);
        this.platforms[index] = gap;
      }
    });
  }

  render() {
    this.platforms.forEach((platform) => {
      platform.render();
  });
  }

  toJSON() {
    return this.platforms.map(platform => platform.toJSON())
  }
}