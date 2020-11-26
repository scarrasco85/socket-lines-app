// Establecer conexión
var socket = io();

// Es recomendable siempre establecer y la conexión y desconexión
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor');
});

// Recoger parámetros opcionales que vienen por url
var urlParams = new URLSearchParams(window.location.search);

// Si no existe el parámetro 'desktop'
if (!urlParams.has('desktop')) {
    // Así el código de javascript ya no se va a seguir ejecutando en esta pantalla
    window.location = 'index.html';
    // En teoría sería lo mismo que poner un return pero aquí no estoy dentro de una función, por eso no 
    // me puedo salir
    throw new Error('El escritorio es necesario');
}
// Capturamos el escritorio
var desktop = urlParams.get('desktop');
var lbTicketScreen = $('small');

// Mostramos en desktop.html
$('#desktopScreen').text('Escritorio ' + desktop);

// Capturamos evento 'click' button
$('#btnNextTicket').on('click', function() {

    // Llamamos al socket 'attendTicket'
    socket.emit('attendTicket', { desktop: desktop }, function(resp) {

        if (resp === 'No hay tickets') {

            lbTicketScreen.text('No hay tickets por atender');
            return;
        }
        lbTicketScreen.text('Ticket: ' + resp.numTicket);

    });
});