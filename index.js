let lastUpdate = new Date().getTime();

// Platform dimensions
const sourcePlatformWidth = 282;
const sourcePlatformHeight = 256;
const targetPlatformWidth = sourcePlatformWidth / 2;
const targetPlatformHeight = (sourcePlatformHeight / 2);

// Platform definitions and stores
const platforms = {};
const normalPlatformLabels = ['normal', 'oneflower', 'threeflowers'];
const normalPlatforms = {
  normal: {
    label: 'normal',
    x: 946,
    y: 435
  },
  oneflower: {
    label: 'oneflower',
    x: 1286,
    y: 435
  },
  threeflowers: {
    label: 'threeflowers',
    x: 625,
    y: 435
  }
};

const edgePlatforms = {
  left: {
    label: 'left',
    x: 572,
    y: 76
  },
  right: {
    label: 'right',
    x: 1290,
    y: 76
  }
};

// Scrolling
let platformScroll = 0;
const scrollingSpeed = 2;
const updateEvery = 10;

// Rendering
const y = (768 - targetPlatformHeight - 100);

draw = () => {
  const img = new Image();
  img.src = 'assets/platform-tileset.png';
  img.addEventListener('load', () => {
    drawPlatform(img);
  });
};

clearCanvas = (canvas) => {
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width + platformScroll, canvas.height);
};

getCurrentTime = () => {
  return new Date().getTime();
};

shallUpdate = () => {
  const currentTime = getCurrentTime();
  const timeDelta = currentTime - lastUpdate;

  return timeDelta >= updateEvery;
};

wasPlatformAlreadyDrawnOnce = (platformIndex) => {
  return platforms[platformIndex] !== undefined;
};

willPlatformStillBeVisible = (x) => {
  return x + (targetPlatformWidth * 2) - platformScroll > 0;
}

drawPlatform = (img) => {
  const currentTime = getCurrentTime();

  if (!shallUpdate()) {
    requestAnimationFrame(() => drawPlatform(img));
    return;
  }

  lastUpdate = currentTime;

  const canvas = document.getElementById('tutorial');
  const context = canvas.getContext('2d');
  let x = 0;

  clearCanvas(canvas);

  // Draw 3 tiles more, otherwise there's ugly popping up
  let platformIndexMax = Math.ceil(canvas.width / targetPlatformWidth) + 3;

  context.save();
  context.translate(-platformScroll, 0);
  platformScroll = platformScroll + scrollingSpeed;

  for (let platformIndex = 0; platformIndex < platformIndexMax; platformIndex++) {
    const nextIndex = platformIndex + 1;
    const previousIndex = platformIndex - 1;

    const previousElementIsGap = platforms[previousIndex] === 'gap';

    if (!willPlatformStillBeVisible(x)) {
      delete platforms[platformIndex];
      x = increaseX(x);
      platformIndexMax++;
      continue;
    }

    let shallDrawPlatform = true;
    const isFirstPlatform = platformIndex === 0;

    if (wasPlatformAlreadyDrawnOnce(platformIndex)) {
      shallDrawPlatform = platforms[platformIndex] !== 'gap';
    } else if (isFirstPlatform) {
      shallDrawPlatform = true;
    } else if (previousElementIsGap) {
      // Make sure a gap is never longer than one element
      shallDrawPlatform = true;
    } else {
      // Randomly decide if drawing platform or gap
      shallDrawPlatform = Math.random() >= 0.4;
    }

    if (shallDrawPlatform) {
      let platformToDraw;

      // If the next platform is empty, draw a right tile
      if(platforms[nextIndex] === 'gap') {
        platformToDraw = edgePlatforms.right;
      } else if (previousElementIsGap) {
        platformToDraw = edgePlatforms.left;
      } else {

        if (wasPlatformAlreadyDrawnOnce(platformIndex)) {
          const tileToDrawLabel = platforms[platformIndex];
          platformToDraw = normalPlatforms[tileToDrawLabel];
        } else {
          const tileToDrawLabel = normalPlatformLabels[Math.floor(Math.random() * normalPlatformLabels.length)];
          platformToDraw = normalPlatforms[tileToDrawLabel];
          platforms[platformIndex] = tileToDrawLabel;
        }
      }

      context.drawImage(img, platformToDraw.x, platformToDraw.y, sourcePlatformWidth, sourcePlatformHeight, x, y, targetPlatformWidth, targetPlatformHeight);

      // Hitbox
      // context.strokeRect(x, y, targetPatternWidth, targetPatternHeight);
    } else {
      platforms[platformIndex] = 'gap';
    }

    x = increaseX(x);
  }

  context.restore();

  requestAnimationFrame(() => drawPlatform(img));
};

increaseX = (x) => {
  return x + targetPlatformWidth;
};

draw();