const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

// Clients conections
io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let nextTicket = ticketControl.nextTicket();

        callback(nextTicket);

    });

    // The actual ticket
    client.emit('currentStatus', {
        currentTicket: ticketControl.getLastTicket(),
        nextFourTickets: ticketControl.getNextFourTickets()
    });

    // Recibe el escritorio y devuelve el ticket con el escritorio asignado para mostrarlo en el cliente
    client.on('attendTicket', (desktop, callback) => {

        if (!desktop) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        // Recibimos el ticket que se va a atender con su escritorio asignado
        let ticketToAttend = ticketControl.attendTicket(desktop.desktop);

        // devolvemos al cliente(frontend) el ticket a atender para mostrarlo en las pantallas
        callback(ticketToAttend);
        // En este momento ya hay un escritorio que está atendiendo un nuevo ticket, por lo que habría
        // que actualizar los 4 siguientes tickets a todo el mundo
        client.broadcast.emit('showedScreenPublics', function() {
            console.log('BROADCAST');
        }, {
            nextFourTickets: ticketControl.getNextFourTickets()
        });

    });

});