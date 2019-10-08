document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  const background = new Background(context);
  const backgroundPromise = background.init();

  const platformCollection = new PlatformCollection(context);
  const platformPromise = platformCollection.init();

  const player = new Player(context);
  const playerPromise = player.init().then(() => {
    player.updatePosition(10, 202);
  });

  Promise.all([playerPromise, platformPromise, backgroundPromise]).then(() => {
    const loop = new Loop(background, player, platformCollection);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        loop.toggleMoving();
      } else if (e.code === 'Space') {
        player.jump();
      }
    })
    requestAnimationFrame(loop.step.bind(loop));
  })
});