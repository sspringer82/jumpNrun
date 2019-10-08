document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  const background = new Background(context);
  const backgroundPromise = background.init();

  const platforms = [
    new Platform(context),
    new Gap(context),
    new Platform(context),
    new Platform(context),
    new Platform(context),
    new Gap(context),
    new Platform(context),
    new Platform(context),
  ];

  const initializedPlatforms = platforms.map((platform) => platform.init());

  const platformPromise = Promise.all(initializedPlatforms).then(() => {
    platforms.forEach((platform, index) => {
      platform.updatePosition(index * 141, 282);
    });
  });

  const player = new Player(context);
  const playerPromise = player.init().then(() => {
    player.updatePosition(10, 202);
  });

  Promise.all([playerPromise, platformPromise, backgroundPromise]).then(() => {
    const loop = new Loop(background, player, platforms);
    requestAnimationFrame(loop.step.bind(loop));
  })
});