# Aufgabe 11: Kollisionserkennung im WebWorker

Lagere die Kollisionserkennung in einen WebWorker aus. 

## Beispiel

Main:

```W
const worker = new Worker('js/worker.js');
worker.postMessage('Oh hi Mark');
worker.onmessage = (event) => {
  console.log('in main: ', event);
};
```

Im Worker:

```javascript
onmessage = (e) => {
  console.log(document);
  console.log('in worker', e);
  postMessage('Hello Main process');
};
```

## Zusätzlich benötigt

Installation

```bash
npm init -y
npm install http-server
```

Konfiguration (package.json):

```javascript
"scripts": {
	...
  "start": "http-server .",
  ...
},
```

Starten

```bash
npm start
```

Aufrufen:

[http://localhost:8080]()