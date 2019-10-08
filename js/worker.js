// const isPlayerInGap = this.platformCollection.platforms
//         .filter((platform) => platform instanceof Gap)
//         .some(gap => gap.x <= this.player.x && gap.x + gap.width >= this.player.x + this.player.width);
//       return isPlayerInGap && this.player.currentState !== Player.jump;

onmessage = ({data: {platforms, player}}) => {
  const isPlayerInGap = platforms
          .filter((platform) => platform.type === 'gap')
          .some(gap => gap.x <= player.x && gap.x + gap.width >= player.x + player.width);
  postMessage(isPlayerInGap && player.currentState !== 'jump')
}