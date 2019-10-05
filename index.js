let platformScroll = 0;

const patternWidth = 282;
const patternHeight = 256;

const targetPatternWidth = patternWidth / 2;
const targetPatternHeight = (patternHeight / 2);

const normalTileLabels = ['normal', 'oneflower', 'threeflowers'];

const scrollingSpeed = 2;
const updateEvery = 10;
let lastUpdate = new Date().getTime();
const tiles = {};
const y = (768 - targetPatternHeight - 100);

const normalTiles = {
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

const endTiles = {
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

draw = () => {
  const canvas = document.getElementById('tutorial');
  const context = canvas.getContext('2d');

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
  let tilesMax = Math.ceil(canvas.width / targetPatternWidth) + 3;

  context.save();
  context.translate(-platformScroll, 0);
  platformScroll = platformScroll + scrollingSpeed;

  for (let drawnTiles = 0; drawnTiles < tilesMax; drawnTiles++) {
    const alreadyDrawnTile = tiles[drawnTiles] !== undefined;

    const isStillVisible = x + targetPatternWidth * 2 - platformScroll > 0;
    if (!isStillVisible) {
      delete tiles[drawnTiles];
      x = increaseX(x);
      tilesMax++;
      continue;
    }

    if (alreadyDrawnTile) {
      shallDrawPlatform = tiles[drawnTiles] !== 'gap';
    } else {
      isFirstPlatform = x < patternWidth;
      previouslyDrawnGap = !shallDrawPlatform;
      // Randomly decide if drawing platform or nothing
      shallDrawPlatform = isFirstPlatform || previouslyDrawnGap || Math.random() >= 0.4;
    }

    if (shallDrawPlatform) {
      let tileToDraw;
      // If the next tile is empty, draw a right tile
      const nextIndex = drawnTiles + 1;
      const previousIndex = drawnTiles - 1;
      if(tiles[nextIndex] === 'gap') {
        tileToDraw = endTiles.right;
      } else if (tiles[previousIndex] === 'gap') {
        tileToDraw = endTiles.left;
      } else {

        if (alreadyDrawnTile) {
          const tileToDrawLabel = tiles[drawnTiles];
          tileToDraw = normalTiles[tileToDrawLabel];
        } else {
          const tileToDrawLabel = normalTileLabels[Math.floor(Math.random() * normalTileLabels.length)];
          tileToDraw = normalTiles[tileToDrawLabel];
          tiles[drawnTiles] = tileToDrawLabel;
        }
      }

      context.drawImage(img, tileToDraw.x, tileToDraw.y, patternWidth, patternHeight, x, y, targetPatternWidth, targetPatternHeight);

      // Hitbox
      // context.strokeRect(x, y, targetPatternWidth, targetPatternHeight);
    } else {
      tiles[drawnTiles] = 'gap';
    }

    x = increaseX(x);
  }

  context.restore();

  requestAnimationFrame(() => drawPlatform(img));
};

increaseX = (x) => {
  return x + targetPatternWidth;
};

draw();