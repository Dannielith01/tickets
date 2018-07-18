const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const { TiketControl } = require('./classes/ticket-control');

const ticketControl = new TiketControl();

const app = express();
let server = http.createServer(app);

let publicPath = path.resolve(__dirname, './public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

let io = socketIO(server);

io.on('connection', (client) => {
    console.log('El cliente se ha conectado');

    client.on('siguienteTicket', (data, callback) => {
        let last = ticketControl.getNext();
        callback(last);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getLast()
    });
});

server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log(`Servidor corriendo en el puerto ${ port }`);
});