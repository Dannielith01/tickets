const fs = require('fs');
const path = require('path');

class TiketControl {
    constructor() {
        this.last = 0;
        this.now = new Date().getDate();

        let data = require('../data/data.json');

        if (data.now === this.now) {

        } else {
            this.resetValues();
        }
    }

    getNext() {
        this.last++;

        this.saveData();

        return `Ticket ${ this.last }`;
    }

    resetValues() {
        this.ultimo = 0;

        saveData();
    }

    saveData() {
        let dataJson = {
            last: this.last,
            now: this.now
        };

        let dataJsonString = JSON.stringify(dataJson);

        fs.writeFileSync(path.resolve(__dirname, '../data/data.json'), dataJsonString);
    }

}

module.exports = {
    TiketControl
};