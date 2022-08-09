import express from 'express';
import groupRouter from './group.router';
import userGroupRouter from './userGroup.router';
import userRouter from './user.router';
import authRouter from "./auth.router";
import authenticateToken from "../middlewares/auth.middleware";

const router = express.Router();

router.use('/users', authenticateToken, userRouter);
router.use('/groups', authenticateToken, groupRouter);
router.use('/user_groups', authenticateToken, userGroupRouter);
router.use('/auth', authRouter);


export default router;
