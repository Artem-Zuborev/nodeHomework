import {GroupModel} from "../types/group.model";
import GroupRepository from "../repositories/group.repository"
import UserGroupRepository from "../repositories/userGroup.repository";
import {Model} from "sequelize";


class GroupService {
    async createGroup(data: GroupModel): Promise<GroupModel | unknown> {
        try {
            return await GroupRepository.createGroup(data);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async updateGroup(id: string, data: Partial<GroupModel>): Promise<GroupModel | unknown> {
        try {
            await GroupRepository.updateGroup(id, data);
            return await GroupRepository.getGroupById(id);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async getGroupById(id: string): Promise<GroupModel | unknown> {
        try {
            return await GroupRepository.getGroupById(id);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async getAllGroups(): Promise<GroupModel | unknown> {
        try {
            return await GroupRepository.getAllGroups();
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async addUserToGroup(userId: string, groupId: string): Promise<GroupModel | unknown> {
        try {
            return await UserGroupRepository.addUserGroup(userId, groupId);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async removeUserFromGroup(userId: string, groupId: string): Promise<GroupModel | unknown> {
        try {
            const group = (await UserGroupRepository.getUserGroup(
                userId,
                groupId
            )) as Model;
            await UserGroupRepository.removeUserGroup(group);
            return { message: 'Group succefully deleted!' };
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async deleteGroupById(id: string): Promise<GroupModel | unknown> {
        try {
            await GroupRepository.hardDeleteGroup(id);
            const userGroups: any = await UserGroupRepository.getUserGroupsByGroupId(id);
            if (userGroups) {
                userGroups.forEach((userGroup) => {
                    UserGroupRepository.removeUserGroup(userGroup);
                });
            }
            return { message: 'Group successfully deleted!' };
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }
}

export default new GroupService();
