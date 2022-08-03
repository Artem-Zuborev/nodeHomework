import express from 'express';
import groupRouter from './group.router';
import userGroupRouter from './userGroup.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/user_groups', userGroupRouter);

export default router;
