import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export default function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.split(' ')[1];
    const RSA_PRIVATE_KEY = fs.readFileSync(
        path.join(__dirname, '../../jwt.key')
    );
    if (token === null) {
        return res.status(401).send({ message: 'Not autorized' });
    }
    verify(
        token as string,
        RSA_PRIVATE_KEY,
        { algorithms: ['RS256'] },
        (err) => {
            if (err) return res.status(403).send({ message: 'Forbidden' });
            next();
        }
    );
}
