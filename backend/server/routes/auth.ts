import * as express from 'express';
import AuthController from "../controllers/auth.controller";

class Auth {
    public routes = express.Router();
    public authController = new AuthController();
    constructor(
    ) {
        this.routes.post('/login', (req, res) => this.authController.login(req, res));
        this.routes.post('/register', (req, res) => this.authController.register(req, res));
        this.routes.get('/user', this.authController.userData);
    }
}

export default Auth;