init = () => {
  const renderer = new Renderer();
  const platform = new Platform();
  const backgroundLayerOne = new BackgroundLayerOne();
  const backgroundLayerTwo = new BackgroundLayerTwo();
  const backgroundLayerThree = new BackgroundLayerThree();
  const backgroundLayerFour = new BackgroundLayerFour();
  const player = new Player();

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
        break;

      case 'ArrowDown':
        player.setState(player.stateIdle);
        break;

      case 'ArrowRight':
        player.setState(player.stateRunning);
        break;
    }
  });
};

init();