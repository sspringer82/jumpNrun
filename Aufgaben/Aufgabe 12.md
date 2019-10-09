# Aufgabe 12: Client-Server-Kommunikation

Implementiere eine WebSocket-Kommunikation, die alle Koordinaten des Spielers und der Plattformen an den Server schickt.

## Client

```javascript
const ws = new WebSocket('ws://127.0.0.1:8081');
ws.send('here be data');
```

## Server

Installation

```bash
npm install ws
```

server.js

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(message);
  });
});
```

package.json

```javascript
  "scripts": {
  	...
    "backend": "node server.js"
  },
```

Starten

```bash
npm run backend
```

