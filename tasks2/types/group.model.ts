import {PermissionModel} from './permission.model'

export type GroupModel = {
    id: string;
    name: string;
    permissions: Array<PermissionModel>;
};
