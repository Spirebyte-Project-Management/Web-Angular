import { GrantModel } from './grant.model';

export class PermissionModel {
    key: string;
    name: string;
    description: string;
    permissionGroup: string;
    grants: GrantModel[];

    setPermission(permission: any) {
        this.key = permission.key;
        this.name = permission.name;
        this.description = permission.description;
        this.permissionGroup = permission.permissionGroup;
        this.grants = permission.grants.map(object => ({ ...object }));
    }
}