const fs = require('fs');
const path = require('path');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TiketControl {
    constructor() {
        this.last = 0;
        this.now = new Date().getDate();
        this.tickets = [];
        this.atendiendo = [];

        let data = require('../data/data.json');

        if (data.now === this.now) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.atendiendo = data.atendiendo;
        } else {
            this.resetValues();
        }
    }

    getNext() {
        this.last++;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.saveData();

        return `Ticket ${ this.last }`;
    }

    getLast(){
        return `Ticket ${ this.last }`;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio );

        this.atendiendo.unshift(atenderTicket);

        if (this.atendiendo.length > 4) {
            this.atendiendo.splice(-1, 1);
        }

        this.saveData();
    }

    resetValues() {
        this.ultimo = 0;
        this.tickets = [];
        this.atendiendo = [];
        this.saveData();
    }

    saveData() {
        let dataJson = {
            last: this.last,
            now: this.now,
            tickets: this.tickets
        };

        let dataJsonString = JSON.stringify(dataJson);

        fs.writeFileSync(path.resolve(__dirname, '../data/data.json'), dataJsonString);
    }

}

module.exports = {
    TiketControl
};