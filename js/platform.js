// Platform dimensions
const sourcePlatformWidth = 282;
const sourcePlatformHeight = 256;
const targetPlatformWidth = sourcePlatformWidth / 2;
const targetPlatformHeight = (sourcePlatformHeight / 2);

class Platform {
  constructor() {
    this.platforms = {};
    this.x = 0;
    this.y = (512 - targetPlatformHeight - 50);
    this.canvas = document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');
    this.platformScroll = 0;

    this.updateEvery = 10;
    this.idleScrollingSpeed = 0;
    this.movingScrollingSpeed = 3.5;
    this.scrollingSpeed = this.idleScrollingSpeed;

    this.typeGap = 'gap';

    this.platformTileset = new Image();
  }

  init() {
    const promise = new Promise((resolve, reject) => {
      this.platformTileset.addEventListener('load', resolve);
    });

    this.platformTileset.src = 'assets/platform-tileset.png';

    return promise;
  }

  getName() {
    return 'Platform';
  }

  getUpdateEvery() {
    return this.updateEvery;
  }

  getBoundingBoxes() {
    const boundingBoxes = [];
    for (let platformIndex in this.platforms) {
      boundingBoxes.push(this.platforms[platformIndex]);
    }
    return boundingBoxes.filter((box) => {
      return box.type !== this.typeGap;
    });
  }

  wasPlatformAlreadyDrawnOnce(platformIndex) {
    return this.platforms[platformIndex] !== undefined;
  };

  willPlatformStillBeVisible() {
    return this.x + (targetPlatformWidth * 2) - this.platformScroll > 0;
  };

  nextElementIsGap(platformIndex) {
    const nextIndex = platformIndex + 1;
    return this.platforms[nextIndex] !== undefined && this.platforms[nextIndex].type === this.typeGap;
  };

  currentElementIsPlatform(platformIndex) {
    return this.platforms[platformIndex] !== undefined && this.platforms[platformIndex].type !== this.typeGap;
  };

  previousElementIsGap(platformIndex) {
    const previousIndex = platformIndex - 1;
    return this.platforms[previousIndex] !== undefined && this.platforms[previousIndex].type === this.typeGap;
  };

  previousElementIsFirstElementAfterGap(platformIndex) {
    const previousIndex = platformIndex - 1;
    return this.previousElementIsGap(previousIndex);
  };

  consumeStateChange(state) {
    if (state === GameLoop.stateMoving) {
      this.scrollingSpeed = this.movingScrollingSpeed;
    } else if (state === GameLoop.stateIdle) {
      this.scrollingSpeed = this.idleScrollingSpeed;
    }
  }

  update() {
    this.increasePlatformScroll();
  }

  draw() {
    this.resetX();
    this.context.save();
    this.scrollPlatform();

    // Always draw 3 tiles more, otherwise there's ugly popping up
    let platformIndexMax = Math.ceil(this.canvas.width / targetPlatformWidth) + 3;

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
    }

    this.context.restore();
  };

  scrollPlatform() {
    this.context.translate(-this.platformScroll, 0);
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
    let platformToDraw;

    // If the next platform is empty, draw a right tile
    if (this.nextElementIsGap(platformIndex)) {
      platformToDraw = PlatformType.edge.right;
    } else if (this.previousElementIsGap(platformIndex)) {
      platformToDraw = PlatformType.edge.left;
    } else {

      if (this.wasPlatformAlreadyDrawnOnce(platformIndex)) {
        const tileToDrawLabel = this.platforms[platformIndex].type;
        platformToDraw = PlatformType.normal[tileToDrawLabel];
      } else {
        platformToDraw = PlatformType.getRandomNormal();
        this.platforms[platformIndex] = {
          type: platformToDraw.label,
          x: this.x,
          y: this.y,
          offset: this.platformScroll,
          width: targetPlatformWidth,
          height: targetPlatformHeight
        };
      }
    }

    this.context.drawImage(this.platformTileset, platformToDraw.x, platformToDraw.y, sourcePlatformWidth, sourcePlatformHeight, this.x, this.y, targetPlatformWidth, targetPlatformHeight);

    // Hitbox
    // this.context.strokeRect(this.x, this.y, targetPlatformWidth, targetPlatformHeight);

    this.increaseX();
  };

  drawSingleGap(platformIndex) {
    this.platforms[platformIndex] = {
      type: this.typeGap,
      x: this.x,
      y: this.y,
      offset: this.platformScroll,
      width: targetPlatformWidth,
      height: targetPlatformHeight
    };
    this.increaseX();
  };

  resetX() {
    this.x = 0;
  }

  increaseX(width = targetPlatformWidth) {
    this.x = this.x + width;
  };

  increasePlatformScroll() {
    this.platformScroll = this.platformScroll + this.scrollingSpeed;
  }
}