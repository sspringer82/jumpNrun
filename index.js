let platformOffset = 0;

function draw() {
  const canvas = document.getElementById('tutorial');
  const context = canvas.getContext('2d');

  const img = new Image();
  img.src = 'assets/platform-tileset.png';
  img.addEventListener('load', () => {
    drawPlatform(img);
  });
}

const patternWidth = 282;
const patternHeight = 256;

const targetPatternWidth = patternWidth / 2;
const targetPatternHeight = (patternHeight / 2);

clearPlatform = (canvas) => {
  const context = canvas.getContext('2d');

  context.clearRect(0, targetPatternHeight * 3, canvas.width, targetPatternHeight);
};

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

const normalTileLabels = ['normal', 'oneflower', 'threeflowers'];

const scrollingSpeed = 2;
const updateEvery = 10;
let lastUpdate = new Date().getTime();
const tiles = {};

drawPlatform = (img) => {
  const currentTime = new Date().getTime();
  const timeDelta = currentTime - lastUpdate;
  if (timeDelta < updateEvery) {
    requestAnimationFrame(() => drawPlatform(img));
    return;
  }

  lastUpdate = currentTime;

  const canvas = document.getElementById('tutorial');
  const context = canvas.getContext('2d');
  const y = (768 - targetPatternHeight - 100);
  let x = 0;

  context.clearRect(x, y, canvas.width + platformOffset, canvas.height);

  // draw until screen is filled horizontally
  let isFirstPlatform = true;
  let shallDrawPlatform = true;
  let previouslyDrawnGap = true;

  // Draw 1 tile more, otherwise there's ugly popping up
  let tilesMax = Math.ceil(canvas.width / targetPatternWidth) + 3;

  context.save();
  context.translate(-platformOffset, 0);
  platformOffset = platformOffset + scrollingSpeed;

  for (let drawnTiles = 0; drawnTiles < tilesMax; drawnTiles++) {
    const alreadyDrawnTile = tiles[drawnTiles] !== undefined;

    const isStillVisible = x + targetPatternWidth * 2 - platformOffset > 0;
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

      // Tile on left end
      // context.drawImage(img, 577, 76, patternWidth, patternHeight, x, y, targetPatternWidth, targetPatternHeight);

      // Tile on right end
      // context.drawImage(img, 1290, 76, patternWidth, patternHeight, x, y, targetPatternWidth, targetPatternHeight);

      // Tile with three flowers
      // context.drawImage(img, 625, 435, patternWidth, patternHeight, x, y, targetPatternWidth, targetPatternHeight);

      // normal tile
      // context.drawImage(img, 946, 435, patternWidth, patternHeight, x, y, targetPatternWidth, targetPatternHeight);

      // tile with 1 flower
      // context.drawImage(img, 1286, 435, patternWidth, patternHeight, x, y, targetPatternWidth, targetPatternHeight);


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