import express from 'express';
import groupController from '../controllers/group.controller';

const groupRouter = express.Router();

groupRouter
    .post('/', groupController.postGroup)
    .put('/', groupController.putGroup)
    .put('/:id', groupController.addUserToGroup)
    .put('/delete-group?:id', groupController.removeUsersFromGroup)
    .get('/', groupController.getAllGroups)
    .get('/:id', groupController.getGroupById)
    .delete('/', groupController.deleteGroup);

export default groupRouter;
