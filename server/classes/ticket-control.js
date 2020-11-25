const fs = require('fs');

class TicketControl {

    constructor() {

        this.lastTicket = 0;
        this.today = new Date().getDate();

        let data = require('../data/data.json');

        // Every time the system reboots or starts a new day
        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
        } else {
            this.rebootSystem();
        }
    }

    // Return next ticket and save in system
    nextTicket() {

        this.lastTicket += 1;
        this.saveData();

        return `Ticket ${ this.lastTicket }`;
    }
    getLastTicket() {
        return `Ticket ${ this.lastTicket }`;
    }

    // Reboot the tickets lines
    rebootCount() {

        this.lastTicket = 0;
        this.saveData();

    }

    saveData() {

        let jsonData = {
            lastTicket: this.lastTicket,
            // nextTicket: this.lastTicket + 1,
            today: this.today
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {

    TicketControl
}