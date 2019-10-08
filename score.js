document.addEventListener('DOMContentLoaded', () => {

  const output = document.querySelector('h1 span');
  output.textContent = 0;

  const socket = new WebSocket('ws://localhost:8081');
  socket.onopen = function (event) {
    console.log('socket opened');
  }
  socket.onmessage = ({data}) => {
    output.textContent = data;
  }
});