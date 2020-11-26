// Establecer conexión
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor');
});


$('#btnRestartLine').on('click', function() {

    socket.emit('restart');
});