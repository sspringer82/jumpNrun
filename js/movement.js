class Movement {
  constructor(player, gameLoop) {
    document.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'ArrowUp':
          if (!gameLoop.isState(GameLoop.stateDead)) {
            player.setState(player.stateJumping);
            gameLoop.setState(GameLoop.stateJumping);
          }
          break;

        case 'ArrowDown':
          player.setState(player.stateIdle);
          gameLoop.setState(GameLoop.stateIdle);
          break;

        case 'ArrowRight':
          if (!gameLoop.isState(GameLoop.stateDead)) {
            player.setState(player.stateRunning);
            gameLoop.setState(GameLoop.stateMoving);
          }
          break;
      }
    });
  }
}