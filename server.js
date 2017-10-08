
var http = require('http');
var express = require('express');
var WSS = require('ws').Server;
var app = express().use(express.static('public'));
var server = http.createServer(app);
server.listen(8080, '10.18.1.124');

var wss = new WSS({ port: 8081 });
var mraa = require('/usr/local/lib/node_modules/mraa');
var groveSensor = require('/usr/local/lib/node_modules/jsupm_grove');


wss.on('connection', function(socket) {
  console.log('Opened Connection 🎉');

  var json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);
  console.log('Sent: ' + json);

  socket.on('message', function(message) {
    console.log('Received: ' + message);
    if(JSON.parse(message.document) == "custom"){
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

var button = new mraa.Gpio(31);     // set up digital read on digital pin #5
button.dir(mraa.DIR_IN);  

var buttonState = button.read();   // read the value of the digital pin
console.log(buttonState);      
function checkState(){
  var buttonState = button.read();   // read the value of the digital pin
  console.log(buttonState);
  if(buttonState == 0) {
    wss.clients.forEach(function each(client) {
      var json = JSON.stringify({ message: 'BPN' });
      client.send(json);
      console.log('Sent: ' + json);
    });
  }else if(buttonState == 1){
    wss.clients.forEach(function each(client) {
      var json = JSON.stringify({ message: 'BPP' });
      client.send(json);
      console.log('Sent: ' + json);
    });
  }
      
}

setInterval(checkState, 510);   
setInterval(broadcast, 5000);

