import ejs from "ejs";
import path from "path";
import express from "express";
import ws from "ws";
import uuid from "node-uuid";
const app = express();

var WebSocketServer = ws.Server,
    wss = new WebSocketServer({port: 8181});



wss.on('connection', function(ws) {
    var client_uuid = uuid.v4();
    console.log('client [%s] connected', client_uuid);

    var atualizaGrafico = function(ws) {
        if(ws.readyState == 1) {
            // var lista = Carnivoro.carnivoros;

            // ws.send(JSON.stringify(lista.length));
            ws.send("oie");
        }
    };

    atualizaGrafico(ws);

    ws.on('message', function(message) {
      atualizaGrafico(ws);
    });

    ws.on('close', function() {
        
    });
});


