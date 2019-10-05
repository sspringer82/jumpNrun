const platformTileset = new Image();

init = () => {
  const platform = new Platform();

  platformTileset.src = 'assets/platform-tileset.png';
  platformTileset.addEventListener('load', platform.draw.bind(platform));
};

init();