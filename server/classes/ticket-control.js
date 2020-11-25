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

        let data = require('../data/data.json');

        // Every time the system reboots or starts a new day
        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.pendingTickets = data.pendingTickets
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
    getLastTicket() {
        return `Ticket ${ this.lastTicket }`;
    }

    // Reboot the tickets lines
    rebootCount() {

        this.lastTicket = 0;
        this.pendingTickets = [];
        this.saveData();

    }

    saveData() {

        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            pendingTickets: this.pendingTickets
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {

    TicketControl
}