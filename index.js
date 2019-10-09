const worker = new Worker('js/worker.js');

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const spectatorMode = urlParams.get('spectator') !== null;

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

  const stream = new Stream(player, platformCollection);

  Promise.all([playerPromise, platformPromise, backgroundPromise]).then(() => {
    const loop = new Loop(context, player, background, platformCollection, stream);
    loop.init(worker);

    if (spectatorMode) {
      loop.setSpectatorMode(true);
    } else {
      document.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
          loop.toggleMoving();
        } else if (e.code === 'Space') {
          player.jump();
        }
      });
    }

    requestAnimationFrame(loop.step.bind(loop));
  });
});
