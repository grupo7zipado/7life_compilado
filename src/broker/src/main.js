import aedesLib from 'aedes';
const aedes = aedesLib();

// CRIA AS PORTAS DE ACESSO 
import net from 'net';

// CRIA O SERVIÇO WS
import ws from 'ws';

// CRIA O SERVIÇO HTTP
import http from 'http';

//
import db from "./db.js";

// Porta do broker MQTT
const PORT_MQTT = 1883;
const WS_PORT =  9001;
// Cria o servidor MQTT
const server = net.createServer(aedes.handle);

// Evento de conexão no broker
aedes.on('client', (client) => {
  console.log(`Cliente conectado: ${client.id} | Conexão: ${JSON.stringify(client.connDetails)}`);
});
  


// Evento de desconexão
aedes.on('clientDisconnect', (client) => {
  console.log(`Cliente desconectado: ${client.id} | Conexão: ${JSON.stringify(client.connDetails)}`);
});

aedes.on('publish', async (packet, client) => {

});


  
// Evento de inscrição em tópicos
aedes.on('subscribe', (subscriptions, client) => {
  console.log(`Cliente inscrito: ${client.id} | Tópicos: ${subscriptions.map(s => s.topic).join(', ')}`);
});
  
// Inicia o servidor
server.listen(PORT_MQTT, () => {
  console.log(`Broker MQTT rodando na porta ${PORT_MQTT}`);
});


// Servidor HTTP + WebSockets para MQTT
const httpServer = http.createServer();
const wss = new ws.Server({ server: httpServer });

wss.on("connection", (ws) => {
  const stream = require("stream");
  const duplex = new stream.Duplex({
    read(size) {},
    write(chunk, encoding, callback) {
      ws.send(chunk, encoding, callback);
    },
  });

  duplex.on("data", (data) => ws.send(data));
  ws.on("message", (msg) => duplex.push(msg));
  ws.on("close", () => duplex.push(null));

  aedes.handle(duplex);
});

httpServer.listen(WS_PORT, () => {
  console.log(`Broker MQTT WebSocket rodando na porta ${WS_PORT}`);
});
