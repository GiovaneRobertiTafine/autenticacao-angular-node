import model from '../models/products.model';

class ProductController {
    constructor() { }

    // Get
    getProducts(req, res) {
        return model.find({}).lean().exec((err, products) => {
            if (err)
                return res.json([]);
            return res.json(products);
        });
    }

}

export default ProductController;