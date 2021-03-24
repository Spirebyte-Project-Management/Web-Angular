export class ProjectModel {
    id: string;
    ownerUserId: string;
    projectUserIds: string[];
    invitedUserIds: string[];
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
        this.pic = project.pic;
        this.title = project.title || '';
        this.description = project.description;
        this.createdAt = project.createdAt;
    }
}
