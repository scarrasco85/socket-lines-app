var socket = io();

var lblNewTicket = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor');
});

// $-JQuery - Escuchamos evento click del button de new-ticket.html
$('#btnNewTicket').on('click', function() {

    // Pidiendo nuevo ticket, no necesito mandar ninguna información(null), pero si que me devuelva un callback
    // para poder mostrar cual es el siguiente ticket
    socket.emit('nextTicket', null, function(nextTicket) {
        lblNewTicket.text(nextTicket);
    });
});