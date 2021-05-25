export class ProjectModel {
    id: string;
    ownerUserId: string;
    projectUserIds: string[];
    invitedUserIds: string[];
    permissionSchemeId: string;
    pic: string;
    title: string;
    description: string;
    issueCount: number;
    createdAt: string;

    setProject(project: any) {
        this.id = project.id || project.projectId;
        this.ownerUserId = project.ownerUserId;
        this.projectUserIds = project.projectUserIds || [];
        this.invitedUserIds = project.invitedUserIds || [];
        this.permissionSchemeId = project.permissionSchemeId;
        this.pic = project.pic;
        this.title = project.title || '';
        this.description = project.description;
        this.createdAt = project.createdAt;
    }

    setPermissionSchemeId(permissionSchemeId: string){
        this.permissionSchemeId = permissionSchemeId;
    }
}
