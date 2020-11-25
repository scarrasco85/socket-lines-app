const express = require('express');
const socketIO = require('socket.io');


// socket.io working with 'http' by default
const http = require('http');

const path = require('path');

const app = express();

// Mounting socket server with Express configuration
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Inicializate socket.io
module.exports.io = socketIO(server);

// Socket logic
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});