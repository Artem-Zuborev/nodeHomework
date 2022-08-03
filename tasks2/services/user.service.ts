import userRepository from "../repositories/user.repository";
import {UserModel} from "../types/user.model";

class UserService {
    async getAllUsers() {
        try {
            return await userRepository.getAllUsers();
        } catch (err) {
            return { message: 'Cannot update User' };
        }
    }

    async getUserById(id: string) {
        try {
            return await userRepository.getUserById(id);
        } catch (err) {
            return { message: `Cannot get User ${err}` };
        }
    }

    async postUser(user: UserModel) {
        try {
            return await userRepository.postUser(user);
        } catch (err) {
            return { message: `Cannot get User ${err}` };
        }
    }

    async putUser(id: string, data: Partial<UserModel>) {
        try {
            await userRepository.putUser(id, data);
            return userRepository.getUserById(id);
        } catch (err) {
            return { message: 'Cannot update User' };
        }
    }

    async deleteUser(id: string) {
        try {
            await userRepository.deleteUser(id, { isdeleted: true });
            return { message: 'User successfully deleted' };
        } catch (err) {
            return { message: `Cannot delete User ${err}` };
        }
    }
}

export default new UserService();
