import userGroupRepository from '../repositories/userGroup.repository';

class UserGroupService {
    async getAllUserGroups() {
        try {
            return await userGroupRepository.getAllUserGroups();
        } catch (err) {
            console.log(`Cannot get all user groups ${err}`);
        }
    }
}

export default new UserGroupService();
