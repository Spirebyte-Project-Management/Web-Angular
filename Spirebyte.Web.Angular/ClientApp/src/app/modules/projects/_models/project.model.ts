export class ProjectModel {
    id: string;
    ownerUserId: string;
    projectUserIds: string[];
    invitedUserIds: string[];
    key: string;
    pic: string;
    title: string;
    description: string;
    createdAt: string;

    setProject(project: any) {
        this.id = project.id;
        this.ownerUserId = project.ownerUserId;
        this.projectUserIds = project.projectUserIds;
        this.invitedUserIds = project.invitedUserIds;
        this.key = project.key;
        this.pic = project.pic;
        this.title = project.title;
        this.description = project.description;
        this.createdAt = project.createdAt;
    }
}
