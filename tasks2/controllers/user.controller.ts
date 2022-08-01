import { Request, Response } from 'express';
import userModule from '../modules/user.module';
import * as crypto from "crypto";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userModule.getAllUsers();
            if (users) {
                res.send(users);
            } else {
                res.send({ message: 'Cannot get all users' });
            }
        } catch (err) {
            console.log('Cannot find users', err);
        }
    }

    async getUserById(req: Request, res: Response) {
        const id = req.params?.id;
        try {
            const user = await userModule.getUserById(id as string);
            if (user) {
                res.status(200).send(user);
            } else {
                res.sendStatus(404).send({ message: 'Cannot find user' });
            }
        } catch (err) {
            console.log('Cannot find user', err);
        }
    }

    async postUser(req: Request, res: Response) {
        const newUser = {
                id: crypto.randomUUID(),
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                isdeleted: req.body.isdeleted
            };
        const newData = await userModule.postUser(newUser);
        if(newData) {
            return  res.status(201).json(newData);
        } else {
            return res.sendStatus(404)
        }
    }

    async putUser(req: Request, res: Response) {
        try {
            const user = await userModule.putUser(
                req.params.id as string,
                req.body
            );
            if (user) {
                res.send(user);
            } else {
                res.status(204).send({ message: 'Cannot update user' });
            }
        } catch (err) {
            console.log('Cannot update user', err);
        }
    }


    async deleteUser(req: Request, res: Response) {
        try {
            const message = await userModule.deleteUser(req.params.id as string);
            res.status(201).send(message);
        } catch (err) {
            console.log('Cannot delete user', err);
        }
    }
}

export default new UserController();
