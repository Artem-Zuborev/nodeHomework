import { Request, Response } from 'express';
import userService from '../services/user.service';
import * as crypto from "crypto";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
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
            const user = await userService.getUserById(id as string);
            if (user) {
                return res.status(200).send(user);
            } else {
                return  res.sendStatus(404).send({ message: 'Cannot find user' });
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
        const newData = await userService.postUser(newUser);
        if(newData) {
            return  res.status(201).json(newData);
        } else {
            return res.sendStatus(404)
        }
    }

    async putUser(req: Request, res: Response) {
        try {
            const user = await userService.putUser(
                req.params.id as string,
                req.body
            );
            if (user) {
                return res.status(201).send(user);
            } else {
                return res.status(204).send({ message: 'Cannot update user' });
            }
        } catch (err) {
            console.log('Cannot update user', err);
        }
    }


    async deleteUser(req: Request, res: Response) {
        try {
            const message = await userService.deleteUser(req.params.id as string);
            return res.status(201).send(message);
        } catch (err) {
            console.log('Cannot delete user', err);
        }
    }
}

export default new UserController();
