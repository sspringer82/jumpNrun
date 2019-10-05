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

  // draw until screen is filled horizontally
  let isFirstPlatform = true;
  let shallDrawPlatform = true;
  let previouslyDrawnGap = true;

  // Draw 1 tile more, otherwise there's ugly popping up
  let tilesMax = Math.ceil(canvas.width / targetPlatformWidth) + 3;

  context.save();
  context.translate(-platformScroll, 0);
  platformScroll = platformScroll + scrollingSpeed;

  for (let drawnTiles = 0; drawnTiles < tilesMax; drawnTiles++) {
    const alreadyDrawnTile = platforms[drawnTiles] !== undefined;

    const isStillVisible = x + targetPlatformWidth * 2 - platformScroll > 0;
    if (!isStillVisible) {
      delete platforms[drawnTiles];
      x = increaseX(x);
      tilesMax++;
      continue;
    }

    if (alreadyDrawnTile) {
      shallDrawPlatform = platforms[drawnTiles] !== 'gap';
    } else {
      isFirstPlatform = x < sourcePlatformWidth;
      previouslyDrawnGap = !shallDrawPlatform;
      // Randomly decide if drawing platform or nothing
      shallDrawPlatform = isFirstPlatform || previouslyDrawnGap || Math.random() >= 0.4;
    }

    if (shallDrawPlatform) {
      let tileToDraw;
      // If the next tile is empty, draw a right tile
      const nextIndex = drawnTiles + 1;
      const previousIndex = drawnTiles - 1;
      if(platforms[nextIndex] === 'gap') {
        tileToDraw = edgePlatforms.right;
      } else if (platforms[previousIndex] === 'gap') {
        tileToDraw = edgePlatforms.left;
      } else {

        if (alreadyDrawnTile) {
          const tileToDrawLabel = platforms[drawnTiles];
          tileToDraw = normalPlatforms[tileToDrawLabel];
        } else {
          const tileToDrawLabel = normalPlatformLabels[Math.floor(Math.random() * normalPlatformLabels.length)];
          tileToDraw = normalPlatforms[tileToDrawLabel];
          platforms[drawnTiles] = tileToDrawLabel;
        }
      }

      context.drawImage(img, tileToDraw.x, tileToDraw.y, sourcePlatformWidth, sourcePlatformHeight, x, y, targetPlatformWidth, targetPlatformHeight);

      // Hitbox
      // context.strokeRect(x, y, targetPatternWidth, targetPatternHeight);
    } else {
      platforms[drawnTiles] = 'gap';
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