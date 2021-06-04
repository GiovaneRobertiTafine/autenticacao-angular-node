import UserModel from '../models/user.model';
import { hashSync, compareSync } from "bcryptjs";
import { Constantes } from "../consts";
import { sign, verify } from "jsonwebtoken";

class AuthController {
    public checkToken: any = (req, res, next) => {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Token não encontrado' });
        }

        verify(token, Constantes.keyJWT,
            (err, decoded) => {
                if (err || !decoded) {
                    return res.status(401).json({ message: 'Erro com o Token' });
                }

                next();
            }
        );
    };

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
        const password = req.body.password;
        const email = req.body.email;

        UserModel.findOne({ email: email }).lean().exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Server error', error: err
                });
            }
            const auth_err = (password === '' || password === null || !user);

            if (!auth_err) {
                if (compareSync(password, user.password)) {
                    let token = sign({ _id: user.id }, Constantes.keyJWT, { expiresIn: Constantes.expiresJWT });
                    delete user.password;
                    return res.json({
                        ...user, token: token
                    });
                }
            }

            return res.status(404).json({
                meesage: 'Erro em e-mail ou senha'
            });

        });
    }

}

export default AuthController;