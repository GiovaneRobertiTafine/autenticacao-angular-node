import * as faker from "faker";
import model from "../models/products.model";
import DataBase from "../db";

export class GenerateProducts extends DataBase {

    constructor() {
        super();
        this.insertProductsFaker();
    }

    async insertProductsFaker() {
        await this.connect()
            .then((status: boolean) => {
                this.add(100)
                    .then(() => {
                        console.log('add Products');
                        this.disconnect();
                    })
                    .catch(err => console.log(err));

            })
            .catch((err) => console.log(err));
    }

    async add(n) {
        try {
            for (let i = 0; i < n; i++) {
                const p = new model;
                p.name = faker.commerce.productName();
                p.deparment = faker.commerce.department();
                p.price = faker.commerce.price();
                await p.save();
            }
        } catch (error) {
            console.log(error);
        }
    }



}
new GenerateProducts();