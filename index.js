init = () => {
  const renderer = new Renderer();
  const platform = new Platform();

  platform.init().then(() => renderer.subscribe(platform));
};

init();