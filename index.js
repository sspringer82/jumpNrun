init = () => {
  const renderer = new Renderer();
  const platform = new Platform();
  const backgroundLayerOne = new BackgroundLayerOne();
  const backgroundLayerTwo = new BackgroundLayerTwo();
  const backgroundLayerThree = new BackgroundLayerThree();
  const backgroundLayerFour = new BackgroundLayerFour();

  backgroundLayerOne.init().then(() => renderer.subscribe(backgroundLayerOne));
  backgroundLayerTwo.init().then(() => renderer.subscribe(backgroundLayerTwo));
  backgroundLayerThree.init().then(() => renderer.subscribe(backgroundLayerThree));
  backgroundLayerFour.init().then(() => renderer.subscribe(backgroundLayerFour));
  platform.init().then(() => renderer.subscribe(platform));
};

init();