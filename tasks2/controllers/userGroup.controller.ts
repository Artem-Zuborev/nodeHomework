import { Request, Response } from 'express';
import userGroupService from '../services/userGroup.service';

class UserGroupController {
    async getAllGroups(req: Request, res: Response) {
        try {
            const userGroups = await userGroupService.getAllUserGroups();
            return res.status(200).send(userGroups);
        } catch (err) {
            console.log(`Cannot find UserGroups ${err}`);
        }
    }
}

export default new UserGroupController();
