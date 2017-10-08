
var socket = new WebSocket('ws://10.18.1.124:8081/');
socket.onopen = function(event) {
  console.log('Data Pipe Open');
  var json = JSON.stringify({ message: 'Hello' });
  socket.send(json);
  console.log('Sent: ' + json);
}

socket.onerror = function(event) {
  console.log('Error: ' + JSON.stringify(event));
}

socket.onmessage = function (event) {

    console.log(event.data);
    if(event.data == '{"message":"a"}')
    {
      var Parsed = JSON.parse(event.data);
      document.getElementById("butfeed").innerHTML = "test";
      console.log(Parsed.message)
    }else if(event.data == '{"message":"CustomS"}'){
      document.getElementById("vibration").innerHTML = "CustomOP";
    }else if(event.data == '{"message":"BPN"}' || '{"message":"BPP"}'){
      if(event.data == '{"message":"BPN"}'){
      document.getElementById("button").innerHTML = "button is not pushed";
      }else if(event.data =='{"message":"BPP"}'){
        document.getElementById("button").innerHTML = "button is pushed";
      }
    }

  console.log('Received: ' + event.data);
}

socket.onclose = function(event) {
  console.log('Closed connection 😱');
}

document.querySelector('#close').addEventListener('click', function(event) {
  socket.close();
  console.log('Closed connection 😱');
});

document.querySelector('#send').addEventListener('click', function(event) {
  var json = JSON.stringify({ message: 'Hey there' });

  console.log('Sent: ' + json);
});

var log = function(text) {
  var li = document.createElement('li');
  li.innerHTML = text;
  document.getElementById('log').appendChild(li);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});
