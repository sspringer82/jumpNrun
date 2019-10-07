init = () => {
  const gameLoop = new GameLoop();
  const collision = new Collision();
  const renderer = new Renderer();
  const platform = new Platform();
  const backgroundLayerOne = new BackgroundLayerOne();
  const backgroundLayerTwo = new BackgroundLayerTwo();
  const backgroundLayerThree = new BackgroundLayerThree();
  const backgroundLayerFour = new BackgroundLayerFour();
  const player = new Player();
  const music = new Music();
  const jump = new Jump();
  const death = new Death();

  collision.setPlayer(player);
  collision.setPlatform(platform);
  collision.setGameLoop(gameLoop);

  gameLoop.subscribe(player);
  gameLoop.subscribe(platform);
  gameLoop.subscribe(backgroundLayerTwo);
  gameLoop.subscribe(backgroundLayerThree);
  gameLoop.subscribe(backgroundLayerFour);
  gameLoop.subscribe(collision);
  gameLoop.subscribe(music);
  gameLoop.subscribe(jump);
  gameLoop.subscribe(death);

  renderer.subscribe(collision);
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

  const movement = new Movement(player, gameLoop);
};

init();