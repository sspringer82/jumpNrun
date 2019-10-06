init = () => {
  const gameLoop = new GameLoop();

  const renderer = new Renderer();
  const platform = new Platform();
  const backgroundLayerOne = new BackgroundLayerOne();
  const backgroundLayerTwo = new BackgroundLayerTwo();
  const backgroundLayerThree = new BackgroundLayerThree();
  const backgroundLayerFour = new BackgroundLayerFour();
  const player = new Player();

  gameLoop.subscribe(player);
  gameLoop.subscribe(platform);
  gameLoop.subscribe(backgroundLayerTwo);
  gameLoop.subscribe(backgroundLayerThree);
  gameLoop.subscribe(backgroundLayerFour);

  backgroundLayerOne.init().then(() => renderer.subscribe(backgroundLayerOne));
  backgroundLayerTwo.init().then(() => renderer.subscribe(backgroundLayerTwo));
  backgroundLayerThree.init().then(() => renderer.subscribe(backgroundLayerThree));
  backgroundLayerFour.init().then(() => renderer.subscribe(backgroundLayerFour));

  Promise.all([
    platform.init(),
    player.init()
  ]).then(() => {
    renderer.subscribe(platform);
    renderer.subscribe(player);
  });

  document.addEventListener('keydown', (event) => {
    switch(event.key) {
      case 'ArrowUp':
        player.setState(player.stateJumping);
        gameLoop.setState(GameLoop.stateMoving);
        break;

      case 'ArrowDown':
        player.setState(player.stateIdle);
        gameLoop.setState(GameLoop.stateIdle);
        break;

      case 'ArrowRight':
        player.setState(player.stateRunning);
        gameLoop.setState(GameLoop.stateMoving);
        break;
    }
  });
};

init();