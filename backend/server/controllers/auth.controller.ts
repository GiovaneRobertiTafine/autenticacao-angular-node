import UserModel from '../models/user.model';
import { hashSync } from "bcryptjs";
import { Constantes } from "../consts";

class AuthController {

    constructor() { }

    async register(req, res) {
        try {
            let u = await UserModel.findOne({ email: req.body.email });
            if (!u) {
                const user = new UserModel(req.body);
                user.password = hashSync(req.body.password, Constantes.bcryptSalts);
                await user.save();
                delete user.password;
                return res.status(200).json(user);
            } else {
                return res.status(403).json({ message: 'Email ja cadastrado', error: {} });

            }
        }
        catch (e) {
            return res.status(500).json({ message: 'Erro ao salvar o usuario', error: e });
        }
    }

    login(req, res) {

    }
}

export default AuthController;