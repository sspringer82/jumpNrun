# Aufgabe 13: Spectator Modus

Implementiere einen Spectator Modus, der die Daten vom Server an die Entitäten Player, Platform und Gap weitergibt und abspielt, während in einem anderen Browserfenster gespielt wird.

Sorge dafür, dass im Zuschauerscreen das Spiel nicht gespielt werden kann.

##URL Params auslesen

```javascript
const urlParams = new URLSearchParams(window.location.search);
const spectatorMode = urlParams.get('spectator') !== null;
```

## Server

server.js

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

const connections = [];

wss.on('connection', function connection(ws) {
  connections.push(ws);
  ws.on('message', function incoming(message) {
    connections.forEach(conn => conn.send(message));
  });
});
```

(Backend-Server neu starten nicht vergessen!)