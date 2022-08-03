import {GroupModel} from "../types/group.model";
import db from "../db/initDb";

const group = db.group;

interface Deletion {
    message: string;
}


class GroupRepository {
    async createGroup(data: GroupModel) {
        try {
            return await group.create({...data});
        } catch (err) {
            console.log(`Cannot create Group ${err}`);
        }
    }

    async updateGroup(id: string, data: Partial<GroupModel>) {
        try {
            await group.update({ ...data }, { where: { id } });
            return { message: 'Group successfully delete' };
        } catch (err) {
            console.log(`Cannot update Group ${err}`);
        }
    }

    async getGroupById(id: string) {
        try {
            return await group.findByPk(id);
        } catch (err) {
            console.log(`Cannot find Group ${err}`);
        }
    }

    async getAllGroups() {
        try {
            return await group.findAll();
        } catch (err) {
            console.log(`Cannot find Groups ${err}`);
        }
    }

    async hardDeleteGroup(id: string): Promise<Deletion | void> {
        try {
            await group.destroy({ where: { id } });
            return { message: 'Group successfully delete' };
        } catch (err) {
            console.log(`Cannot delete Group ${err}`);
        }
    }
}

export default new GroupRepository();
