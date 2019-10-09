onmessage = ({data: {platforms, player}}) => {
  const isPlayerInGap = platforms
          .filter((platform) => platform.type === 'gap')
          .some(gap => gap.x <= player.x && gap.x + gap.width >= player.x + player.width);
  postMessage(isPlayerInGap && player.currentState !== 'jump')
}