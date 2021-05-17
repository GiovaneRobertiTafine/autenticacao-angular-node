import * as express from 'express';
import PersonController from "../controllers/person.controller";
import ProductController from "../controllers/products.controller";

class Api {
    public personController = new PersonController();
    public productController = new ProductController();
    public routes = express.Router();
    constructor(
    ) {
        this.routes.get('/people', (req, res) => this.personController.getUsers(req, res));
        this.routes.get('/products', (req, res) => this.productController.getProducts(req, res));
    }

}

export default Api;