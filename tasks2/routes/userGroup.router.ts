import userGroupController from '../controllers/userGroup.controller';
import express from 'express';

const userGroupRouter = express.Router();

userGroupRouter.get('/', userGroupController.getAllGroups);

export default userGroupRouter;
