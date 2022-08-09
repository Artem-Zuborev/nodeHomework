import {Model} from 'sequelize/types';
import db from '../db/initDb';
import {UserGroupModel} from "../types/userGroup.model";


class UserGroupRepository {
    public userGroup = db.userGroup;
    async addUserGroup(groupId: string, userId: string): Promise<UserGroupModel | unknown> {
        try {
            console.log(groupId, userId);
            return await this.userGroup.create({userId, groupId});
        } catch (err) {
            console.log(`Cannot create UserGroup ${err}`);
        }
    }

    async getUserGroup(userId: string, groupId: string): Promise<UserGroupModel | unknown> {
        try {
            return await this.userGroup.findOne({
                where: {userId, groupId}
            });
        } catch (err) {
            console.log(`Cannot find UserGroup ${err}`);
        }
    }

    async getUserGroupsByGroupId(groupId: string): Promise<UserGroupModel | unknown> {
        try {
            return await this.userGroup.findAll({
                where: {groupId}
            });
        } catch (err) {
            console.log(`Cannot find UserGroup by group ID ${err}`);
        }
    }

    async removeUserGroup(group: Model): Promise<UserGroupModel | unknown> {
        try {
            await group?.destroy();
            return { message: 'UserGroup successfully deleted' };
        } catch (err) {
            console.log(`Cannot delete UserGroup ${err}`);
        }
    }

    async getAllUserGroups(): Promise<UserGroupModel | unknown> {
        try {
            return await this.userGroup.findAll();
        } catch (err) {
            console.log(`Cannot find UserGroups ${err}`);
        }
    }
}

export default new UserGroupRepository();
