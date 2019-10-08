const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8081 });

const connections = [];


wss.on('connection', function connection(ws) {
  connections.push(ws);
  ws.on('message', function incoming(message) {
    connections.forEach(conn => conn.send(message));
  });
});