const API = require('./api');
const Database = require('./database/database');

class Main {
    // Create a database object.
    database = new Database();
    api;

    constructor() {
        this.api = new API(this.database);
    }
}

new Main();