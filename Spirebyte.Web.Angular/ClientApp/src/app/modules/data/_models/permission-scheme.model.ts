import { PermissionModel } from './permission.model';

export class PermissionSchemeModel {
    id: string;
    projectId: string;
    name: string;
    description: string;
    permissions: PermissionModel[];

    setPermissionScheme(permissionScheme: any) {
        this.id = permissionScheme.id || permissionScheme.projectSchemeId;
        this.projectId = permissionScheme.projectId;
        this.name = permissionScheme.name;
        this.description = permissionScheme.description;
        this.permissions = permissionScheme.permissions.map(object => ({ ...object }));;
    }
}
