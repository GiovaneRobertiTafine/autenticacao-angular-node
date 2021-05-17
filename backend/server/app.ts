import * as express from 'express';
import * as bodyparser from 'body-parser';
import database from './db';

class App {
    public app: express.Application;
    private database: database;

    constructor() {
        this.app = express();
        this.middleware();
        this.database = new database();
        this.database.createConnection();
        this.routes();
        console.log('rs');
    }

    middleware() {
        // this.app.use(bodyparser.json());
        // this.app.use(bodyparser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.route('/').get((req, res) => res.status(200).json({ rest: 'hello world' }));
    }
}

export default new App();