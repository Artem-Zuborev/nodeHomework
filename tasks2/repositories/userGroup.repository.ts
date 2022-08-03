import {Model} from 'sequelize/types';
import db from '../db/initDb';

const userGroup = db.userGroup;

class UserGroupRepository {
    async addUserGroup(groupId: string, userId: string) {
        try {
            console.log(groupId, userId);
            return await userGroup.create({userId, groupId});
        } catch (err) {
            console.log(`Cannot create UserGroup ${err}`);
        }
    }

    async getUserGroup(userId: string, groupId: string) {
        try {
            return await userGroup.findOne({
                where: {userId, groupId}
            });
        } catch (err) {
            console.log(`Cannot find UserGroup ${err}`);
        }
    }

    async getUserGroupsByGroupId(groupId: string) {
        try {
            return await userGroup.findAll({
                where: {groupId}
            });
        } catch (err) {
            console.log(`Cannot find UserGroup by group ID ${err}`);
        }
    }

    async removeUserGroup(group: Model) {
        try {
            await group?.destroy();
            return { message: 'UserGroup successfully deleted' };
        } catch (err) {
            console.log(`Cannot delete UserGroup ${err}`);
        }
    }

    async getAllUserGroups() {
        try {
            return await userGroup.findAll();
        } catch (err) {
            console.log(`Cannot find UserGroups ${err}`);
        }
    }
}

export default new UserGroupRepository();
