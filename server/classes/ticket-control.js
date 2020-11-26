const fs = require('fs');

class Ticket {

    constructor(numTicket, desktop) {

        this.numTicket = numTicket;
        this.desktop = desktop;
    }

}

class TicketControl {

    constructor() {

        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.pendingTickets = [];
        // Contiene los próximos 4 tickets que les toca ser atendidos
        this.nextFourTickets = [];

        let data = require('../data/data.json');

        // Every time the system reboots or starts a new day
        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.pendingTickets = data.pendingTickets;
            this.nextFourTickets = data.nextFourTickets;
        } else {
            this.rebootCount();
        }
    }

    // Return next ticket and save in system
    nextTicket() {

        this.lastTicket += 1;
        // lastTicket = numTicket, null = desktop
        let newTicket = new Ticket(this.lastTicket, null);
        console.log({ newTicket });
        this.pendingTickets.push(newTicket);

        this.saveData();

        return `Ticket ${ this.lastTicket }`;
    }

    // Para atender el primer ticket en la cola y se le asigna un escritorio
    attendTicket(desktop) {

        if (this.pendingTickets.length === 0) {
            return `No hay tickets`;
        }

        // Lo hacemos así para perder que javaScript pasa todos los argumentos por referencia
        let numTicket = this.pendingTickets[0].numTicket;
        // Eliminamos el primer elemento
        this.pendingTickets.shift();

        let attendedTicket = new Ticket(numTicket, desktop);

        // Añadimos el ticket atendido al inicio de los tickets mostrados en pantalla
        this.nextFourTickets.unshift(attendedTicket);

        // Como tendremos 4 pantallas sólo mantendremos 4 elementos en el array de los tickets atendidos
        if (this.nextFourTickets.length > 4) {
            // eliminamos el último elemento del array
            this.nextFourTickets.splice(-1, 1);
        }
        console.log('Tickets a mostrar');
        console.log(this.nextFourTickets);

        this.saveData();

        return attendedTicket;

    }

    getLastTicket() {
        return `Ticket ${ this.lastTicket }`;
    }

    // Reboot the tickets lines
    rebootCount() {

        this.lastTicket = 0;
        this.pendingTickets = [];
        this.nextFourTickets = [];
        this.saveData();

    }

    saveData() {

        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            pendingTickets: this.pendingTickets,
            nextFourTickets: this.nextFourTickets
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {

    TicketControl
}