// Platform dimensions
const sourcePlatformWidth = 282;
const sourcePlatformHeight = 256;
const targetPlatformWidth = sourcePlatformWidth / 2;
const targetPlatformHeight = (sourcePlatformHeight / 2);

// Scrolling
const scrollingSpeed = 2;
const updateEvery = 10;

class Platform {
  constructor() {
    this.lastUpdate = new Date().getTime();
    this.platforms = {};
    this.x = 0;
    this.y = (512 - targetPlatformHeight - 50);
    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');
    this.platformScroll = 0;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width + this.platformScroll, this.canvas.height);
  };

  getCurrentTime() {
    return new Date().getTime();
  };

  shallUpdate() {
    const currentTime = this.getCurrentTime();
    const timeDelta = currentTime - this.lastUpdate;

    return timeDelta >= updateEvery;
  };

  wasPlatformAlreadyDrawnOnce(platformIndex) {
    return this.platforms[platformIndex] !== undefined;
  };

  willPlatformStillBeVisible() {
    return this.x + (targetPlatformWidth * 2) - this.platformScroll > 0;
  };

  currentElementIsGap(platformIndex) {
    return this.platforms[platformIndex] === 'gap';
  };

  currentElementIsPlatform(platformIndex) {
    return this.platforms[platformIndex] !== 'gap';
  };

  previousElementIsGap(platformIndex) {
    const previousIndex = platformIndex - 1;
    return this.platforms[previousIndex] === 'gap';
  };

  previousElementIsFirstElementAfterGap(platformIndex) {
    const previousIndex = platformIndex - 1;
    return this.previousElementIsGap(previousIndex);
  };

  draw() {
    if (!this.shallUpdate()) {
      requestAnimationFrame(this.draw.bind(this));
      return;
    }

    const currentTime = this.getCurrentTime();

    this.resetX();

    this.lastUpdate = currentTime;
    this.clearCanvas();

    // Always draw 3 tiles more, otherwise there's ugly popping up
    let platformIndexMax = Math.ceil(this.canvas.width / targetPlatformWidth) + 3;

    this.context.save();
    this.scrollPlatform();

    for (let platformIndex = 0; platformIndex < platformIndexMax; platformIndex++) {
      if (!this.willPlatformStillBeVisible()) {
        delete this.platforms[platformIndex];
        this.increaseX();
        platformIndexMax++;
        continue;
      }

      if (this.willBePlatform(platformIndex)) {
        this.drawSinglePlatform(platformIndex);
      } else {
        this.drawSingleGap(platformIndex);
      }

      this.increaseX();
    }

    this.context.restore();

    requestAnimationFrame(this.draw.bind(this));
  };

  scrollPlatform() {
    this.context.translate(-this.platformScroll, 0);
    this.increasePlatformScroll();
  };

  randomDecisionForPlatform() {
    return Math.random() >= 0.4;
  };

  willBePlatform(platformIndex) {
    const isFirstPlatform = platformIndex === 0;

    let isThisAPlatform = false;
    if (this.wasPlatformAlreadyDrawnOnce(platformIndex)) {
      isThisAPlatform = this.currentElementIsPlatform(platformIndex);
    } else if (isFirstPlatform) {
      isThisAPlatform = true;
    } else if (this.previousElementIsGap(platformIndex)) {
      // Make sure a gap is never longer than one element
      isThisAPlatform = true;
    } else if (this.previousElementIsFirstElementAfterGap(platformIndex)) {
      isThisAPlatform = true;
    } else if (this.randomDecisionForPlatform()) {
      // Randomly decide if drawing platform or gap
      isThisAPlatform = true;
    }

    return isThisAPlatform;
  };

  drawSinglePlatform(platformIndex) {
    const nextIndex = platformIndex + 1;

    let platformToDraw;

    // If the next platform is empty, draw a right tile
    if (this.platforms[nextIndex] === 'gap') {
      platformToDraw = PlatformType.edge.right;
    } else if (this.previousElementIsGap(platformIndex)) {
      platformToDraw = PlatformType.edge.left;
    } else {

      if (this.wasPlatformAlreadyDrawnOnce(platformIndex)) {
        const tileToDrawLabel = this.platforms[platformIndex];
        platformToDraw = PlatformType.normal[tileToDrawLabel];
      } else {
        platformToDraw = PlatformType.getRandomNormal();
        this.platforms[platformIndex] = platformToDraw.label;
      }
    }

    this.context.drawImage(platformTileset, platformToDraw.x, platformToDraw.y, sourcePlatformWidth, sourcePlatformHeight, this.x, this.y, targetPlatformWidth, targetPlatformHeight);

    // Hitbox
    // context.strokeRect(x, y, targetPlatformWidth, targetPlatformHeight);
  };

  drawSingleGap(platformIndex) {
    this.platforms[platformIndex] = 'gap';
  };

  resetX() {
    this.x = 0;
  }

  increaseX() {
    this.x = this.x + targetPlatformWidth;
  };

  increasePlatformScroll() {
    this.platformScroll = this.platformScroll + scrollingSpeed;
  }
}