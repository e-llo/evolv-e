var ws = new WebSocket("ws://localhost:8181");

var numCarnivoros = Carnivoro.carnivoros.length;

var texto = document.getElementById("text");

ws.onopen = function(e) {
    console.log('Connection to server opened');
    ws.send("oi 2");
    // ws.send(JSON.stringify(numCarnivoros));

  }

  var atualiza = function(textoNovo){
    texto.value = textoNovo+"oi";
  }

  ws.onmessage = function(e) {
    atualiza("1");
  }

  ws.onclose = function(e) {
  
    console.log("Connection closed");
  }
  function disconnect() {
    ws.close();
  }

