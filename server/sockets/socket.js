const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

// Clients conections
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        user: 'Admin',
        message: 'Welcome to this app'
    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Listening 'enviarMensaje' of clients
    client.on('enviarMensaje', (data) => {

        console.log(data);

        // Broadcast 'enviarMensaje'
        client.broadcast.emit('enviarMensaje', data);

    });

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