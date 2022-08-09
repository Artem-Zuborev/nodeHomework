import authController from '../controllers/auth.controller';
import express from 'express';

const authRouter = express.Router();

authRouter
    .post('/login', authController.login)
    .post('/registration', authController.registration);

export default authRouter;
