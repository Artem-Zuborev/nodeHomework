import {UserModel} from "../types/user.model";
import db from '../db/initDb';


const User = db.user


class UserService {
    async getAllUsers() {
        try {
            return User.findAll();
        } catch (err) {
            console.log(`Cannot find Users ${err}`);
        }
    }


    async getUserById(id: string) {
        try {
            return await User.findByPk(id);
        } catch (err) {
            console.log(`Cannot find User ${err}`);
        }
    }

    async postUser(data: Partial<UserModel>) {
        try {
            return await User.create(data);
        } catch (err) {
            console.log(`Cannot create user ${err}`);
        }
    }

    async putUser(id: string, data: Partial<UserModel>) {
        try {
            await User.update({ ...data }, { where: { id } });
            return { message: 'User successfully updated' };
        } catch (err) {
            console.log(`Cannot update User ${err}`);
        }
    }

    async deleteUser(id: string, data: Partial<UserModel>) {
        try {
            await User.update({ ...data }, { where: { id } });
            return { message: 'User successfully updated' };
        } catch (err) {
            console.log(`Cannot update User ${err}`);
        }
    }
}

export default new UserService();
