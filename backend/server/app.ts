import * as express from 'express';
import * as bodyparser from 'body-parser';
import database from './db';
import Api from "./routes/api";
import Auth from "./routes/auth";
import * as cors from "cors";

class App {
    public app: express.Application;
    private database: database;
    private api = new Api();
    private auth = new Auth();

    constructor() {
        this.app = express();
        this.middleware();
        this.database = new database();
        this.database.connect();
        this.routes();

    }

    middleware() {
        // this.app.use(function (req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        //     res.header("Access-Control-Request-Headers", 'Content-Type, application/json, text/plain, */*');
        //     next();
        // });
        const allowedOrigins = ['http://localhost:4200'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        // Then pass these options to cors:
        this.app.use(cors(options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/api', this.api.routes);
        this.app.use('/auth', this.auth.routes);
        this.app.route('/').get((req, res) => res.status(200).json({ rest: 'hello world' }));
    }
}

export default new App();