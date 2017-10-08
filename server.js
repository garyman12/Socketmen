
var http = require('http');
var express = require('express');
var WSS = require('ws').Server;

var app = express().use(express.static('public'));
var server = http.createServer(app);
server.listen(8080, '10.18.1.124');

var wss = new WSS({ port: 8081 });
wss.on('connection', function(socket) {
  console.log('Opened Connection 🎉');

  var json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);
  console.log('Sent: ' + json);

  socket.on('message', function(message) {
    console.log('Received: ' + message);
    if(message == '{"message":"custom"}'){
      console.log("ayyy");
      wss.clients.forEach(function each(client) {
        var json = JSON.stringify({ message: 'CustomS' });
        client.send(json);
        console.log('Sent: ' + json);
      });
    }

    wss.clients.forEach(function each(client) {
      var json = JSON.stringify({ message: 'STest123' });
      client.send(json);
      console.log('Sent: ' + json);
    });
  });

  socket.on('close', function() {
    console.log('Connection Pipe Closed');
  });

});

var broadcast = function() {
  var json = JSON.stringify({
    message: 'a'
  });

  wss.clients.forEach(function each(client) {
    client.send(json);
    console.log('Sent: ' + json);
  });
}
setInterval(broadcast, 100000);
