import userService from '../services/user.service';
import {UserModel} from "../types/user.model";

class UserModule {
    async putUser(id: string, data: Partial<UserModel>) {
        try {
            await userService.putUser(id, data);
            return userService.getUserById(id);
        } catch (err) {
            return { message: 'Cannot update User' };
        }
    }

    async getAllUsers() {
        try {
            return await userService.getAllUsers();
        } catch (err) {
            return { message: 'Cannot update User' };
        }
    }

    async getUserById(id: string) {
        try {
            return await userService.getUserById(id);
        } catch (err) {
            return { message: `Cannot get User ${err}` };
        }
    }

    async postUser(user: UserModel) {
        try {
            return await userService.postUser(user);
        } catch (err) {
            return { message: `Cannot get User ${err}` };
        }
    }

    async deleteUser(id: string) {
        try {
            await userService.deleteUser(id, { isdeleted: true });
            return { message: 'User successfully deleted' };
        } catch (err) {
            return { message: `Cannot delete User ${err}` };
        }
    }
}

export default new UserModule();
