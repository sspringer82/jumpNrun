document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sheep-and-run');
  const context = canvas.getContext('2d');

  const background = new Background(context);
  background.init().then(() => background.render());

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

  Promise.all(initializedPlatforms).then(() => {
    platforms.forEach((platform, index) => {
      platform.updatePosition(index * 141, 282);
      platform.render();
    });
  });

  const player = new Player(context);
  player.init().then(() => {
    player.updatePosition(10, 202);
    player.render();
  });
});