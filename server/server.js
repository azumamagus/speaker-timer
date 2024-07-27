// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', function connection(ws) {
  clients.push(ws);

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ command: data.command, time: data.time }));
      }
    });
  });

  ws.on('close', function () {
    clients = clients.filter(client => client !== ws);
  });

  ws.send(JSON.stringify({ message: 'connected' }));
});

console.log('WebSocket server is running on ws://localhost:8080');
