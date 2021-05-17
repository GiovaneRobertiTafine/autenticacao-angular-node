import * as mongoose from "mongoose";

class DataBase {
    private dbUrl = 'mongodb://localhost:27017/auth';
    protected dbConnection = mongoose;

    constructor() { }


    async connect(): Promise<boolean> {
        this.dbConnection.set('useCreateIndex', true);
        return await this.dbConnection.connect(this.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('mongoose is connected');
                return true;
            })
            .catch((err) => {
                console.error.bind(console, 'error in connection: ' + err);
                return false;
            });

    }

    disconnect() {
        this.dbConnection.disconnect();
        console.log('mongoose is disconnected');
    }
}

export default DataBase;