import * as mongoose from "mongoose";

class DataBase {
    private dbUrl = 'mongodb://localhost:27017/auth';
    private dbConnection;

    constructor() { }

    createConnection() {
        mongoose.set('useCreateIndex', true);
        mongoose.connect(this.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        this.logger();

    }

    logger() {
        this.dbConnection = mongoose.connection;
        this.dbConnection.on('connected', () => console.log('mongoose is connected'));
        this.dbConnection.on('error', (error) => console.error.bind(console, 'error in connection: ' + error));

    }
}

export default DataBase;