import { Request, Response } from 'express';
import  AuthService  from '../services/auth.service'
import crypto from "crypto";
import {UserModel} from "../types/user.model";

class AuthController {
    async login(req: Request, res: Response): Promise<UserModel | unknown> {
        try {
            const {login, password} = req.body;
            const token = await AuthService.login({login, password});
            if (token) {
                return res.json({token}).status(200);
            } else {
                return res.json({message: 'Not authorized'}).sendStatus(401);
            }
        } catch (err) {
            return res.json(`Cannot login ${err}`).sendStatus(401);
        }
    }

    async registration(req: Request, res: Response) {
        try {
            const newUser = {
                id: crypto.randomUUID(),
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                isdeleted: req.body.isdeleted
            }
            const user = await AuthService.registration(newUser);
            if (user) {
                res.status(201).send(user);
            } else {
                res.sendStatus(401).send({ message: 'Cannot create user' });
            }
        } catch (err) {
            console.log('Cannot create user', err);
        }
    }

}

export default new AuthController();
