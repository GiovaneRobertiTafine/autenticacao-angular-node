import model from '../models/person.model';

class PersonController {
    constructor() { }

    // Get
    getUsers(req, res) {
        return model.find({}).lean().exec((err, people) => {
            if (err)
                return res.json([]);
            return res.json(people);
        });
    }

}

export default PersonController;