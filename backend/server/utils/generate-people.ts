import * as faker from "faker";
import model from "../models/person.model";
import DataBase from "../db";

export class GeneratePerson extends DataBase {

    constructor() {
        super();
        this.insertPeopleFaker();
    }

    insertPeopleFaker() {
        this.connect()
            .then(() => {
                this.add(100)
                    .then(() => {
                        console.log('add People');
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
                p.country = faker.address.country();
                p.email = faker.internet.email();
                p.company = faker.company.companyName();
                await p.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

}

new GeneratePerson();