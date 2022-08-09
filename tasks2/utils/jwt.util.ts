import fs from 'fs';
import { sign, SignOptions } from 'jsonwebtoken';
import path from 'path';
import { UserModel } from '../types/user.model';

export async function generateToken(payload: Partial<UserModel>) {
    const RSA_PRIVATE_KEY = fs.readFileSync(
        path.join(__dirname, '../../jwt.key')
    );

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };
    return sign({ payload }, RSA_PRIVATE_KEY, signInOptions);
}
