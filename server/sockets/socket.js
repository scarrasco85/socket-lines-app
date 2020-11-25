const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const data = require('../data/data.json');


const ticketControl = new TicketControl();

// Clients conections
io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        console.log(data);
        let nextTicket = ticketControl.nextTicket();
        console.log('El siguiente ticket es :', nextTicket);
        callback(nextTicket);

    });

    // The actual ticket
    client.emit('currentStatus', {
        currentTicket: ticketControl.getLastTicket()
    });

    // client.emit('enviarMensaje', {
    //     user: 'Admin',
    //     message: 'Welcome to this app'
    // });


    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Listening 'enviarMensaje' of clients
    // client.on('enviarMensaje', (data) => {

    //     console.log(data);

    //     // Broadcast 'enviarMensaje'
    //     client.broadcast.emit('enviarMensaje', data);

    // });

    // Listening 'enviarMensaje' of clients
    //  client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     if (message.user) {
    //         callback({
    //             resp: 'Todo salió bien'
    //         });
    //     } else {
    //         callback({
    //             resp: 'Algo salió mal'
    //         });
    //     }

    // });

});