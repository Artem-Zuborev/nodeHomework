import {GroupModel} from "../types/group.model";
import GroupRepository from "../repositories/group.repository"
import UserGroupRepository from "../repositories/userGroup.repository";
import {Model} from "sequelize";


class GroupModule {
    async createGroup(data: GroupModel) {
        try {
            return await GroupRepository.createGroup(data);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async updateGroup(id: string, data: Partial<GroupModel>) {
        try {
            await GroupRepository.updateGroup(id, data);
            return await GroupRepository.getGroupById(id);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async getGroupById(id: string) {
        try {
            return await GroupRepository.getGroupById(id);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async getAllGroups() {
        try {
            return await GroupRepository.getAllGroups();
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async addUserToGroup(userId: string, groupId: string) {
        try {
            return await UserGroupRepository.addUserGroup(userId, groupId);
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }

    async removeUserFromGroup(userId: string, groupId: string) {
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

    async deleteGroupById(id: string) {
        try {
            await GroupRepository.hardDeleteGroup(id);
            const userGroups = await UserGroupRepository.getUserGroupsByGroupId(id);
            if (userGroups) {
                userGroups.forEach((userGroup) => {
                    UserGroupRepository.removeUserGroup(userGroup);
                });
            }
            return { message: 'Group succefully deleted!' };
        } catch (err) {
            return { message: `Cannot create Group ${err}` };
        }
    }
}

export default new GroupModule();
