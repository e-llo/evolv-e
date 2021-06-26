import path from "path";
import ws from "ws";
import uuid from "node-uuid";
// import * as echarts from 'echarts';

var WebSocketServer = ws.Server,
    wss = new WebSocketServer({port: 8181});

var grafico = [];

wss.on('connection', function(ws) {
    var client_uuid = uuid.v4();
    console.log('client [%s] connected', client_uuid);

    ws.on('message', function(dadosEmJson) {
        if(dadosEmJson == {reset: true}) {
            grafico.length = 0;
            return;
        }
        var novoDado = JSON.parse(dadosEmJson);
        atualizaGrafico(ws, novoDado);
    });

    var atualizaGrafico = function(ws, novoDado) {
        if(ws.readyState == 1) { // se a conexão com o client estiver aberta

            // add o novo dado no array
            grafico.push(novoDado);

            // envia o array de valores para o client (em json)
            ws.send(JSON.stringify(grafico));
        }
    };

    ws.on('close', function() {
        console.log('client [%s] desconnected', client_uuid);
        // resetar os dados
        grafico.length = 0;
    });
});


