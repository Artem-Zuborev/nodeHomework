import {UserModel} from "../types/user.model";
import db from '../db/initDb';
import {Message} from "csvtojson/v2/ProcessFork";

class UserRepository {
    public User = db.user;

    async getAllUsers() {
        return this.User.findAll();
    }


    async getUserById(id: string): Promise<UserModel> {
        return await this.User.findByPk(id);
    }

    async postUser(data: Partial<UserModel>): Promise<UserModel> {
        return await this.User.create(data);
    }

    async putUser(id: string, data: Partial<UserModel>): Promise<Message | unknown> {
        await this.User.update({ ...data }, { where: { id } });
        return { message: 'User successfully updated' };
    }

    async deleteUser(id: string, data: Partial<UserModel>): Promise<Message | unknown> {
        await this.User.update({ ...data }, { where: { id } });
        return { message: 'User successfully updated' };
    }

    async getUserByLogin(login: string): Promise<UserModel> {
        return await this.User.findOne({where: {login}});
    }
}

export default new UserRepository();
