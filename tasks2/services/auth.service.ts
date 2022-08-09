import bcrypt from 'bcrypt';
import {UserModel} from '../types/user.model';
import {generateToken} from '../utils/jwt.util';
import userRepository from "../repositories/user.repository";

class AuthService {
    async login(data: Partial<UserModel>) {
        try {
            const {login, password} = data;
            const user: any = await userRepository.getUserByLogin(login as string);
            if (
                password &&
                login &&
                user?.get().login === login &&
                await this.comparePasswords(password, user?.get().password)
            ) {
                return await generateToken({...user?.get()});
            }
        } catch (err) {
            return {message: `Cannot login ${err}`};
        }
    }

    async comparePasswords(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    async registration(userData: UserModel) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const password = await bcrypt.hash(userData.password, salt);
        const newUser = { ...userData, password };
        return await userRepository.postUser(newUser);
    }

}

export default new AuthService();
