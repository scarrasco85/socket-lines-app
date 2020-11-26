// Establecer conexión
var socket = io();

// Referencias elementos html
var lblTicket1 = $('#lblTicket1');
var lbldesktop1 = $('#lbldesktop1');
var lblTicket2 = $('#lblTicket2');
var lbldesktop2 = $('#lbldesktop2');
var lblTicket3 = $('#lblTicket3');
var lbldesktop3 = $('#lbldesktop3');
var lblTicket4 = $('#lblTicket4');
var lbldesktop4 = $('#lbldesktop4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lbldesktop1, lbldesktop2, lbldesktop3, lbldesktop4];

// Es recomendable siempre establecer y la conexión y desconexión
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor');
});

// Cada vez que cambia el estado se actualizan las pantallas públicas que ven los clientes donde se muestran
// los 4 tickets que se estan atendiendo - Este es necesario para la primera vez que se inicia una ventana
// public.html y que se muestren sin tener que pulsar atender un ticket
socket.on('currentStatus', function({ nextFourTickets }) {

    updateHTML(nextFourTickets);

});

// Para actualizar todas las ventanas públicas que haya
socket.on('showedScreenPublics', function(nextFourTickets) {

    var audio = $('audio');
    audio.play();

    updateHTML(nextFourTickets);
});

// Actualiza los HTML que simulan pantallas del public.html
function updateHTML(nextFourTickets) {

    for (i = 0; i < nextFourTickets.length - 1; i++) {

        lblTickets[i].text('Ticket ' + nextFourTickets[i].numTicket);
        lblDesktops[i].text('Escritorio ' + nextFourTickets[i].desktop);
    }

    // Otra forma de hacerlo sin usar arrays
    // for (i = 0; i < nextFourTickets.length; i++) {
    //     // eval() hace que se evalue antes la concatenación y luego llame a la función .text()
    //     eval('lblTicket' + (i + 1)).text('Ticket ' + nextFourTickets[i].numTicket);
    //     eval('lbldesktop' + (i + 1)).text('Escritorio ' + nextFourTickets[i].desktop);
    // }
}