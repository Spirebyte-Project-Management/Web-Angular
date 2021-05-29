export class ProjectGroupModel {
    id: string;
    projectId: string;
    name: string;
    userIds: string[];

    setProjectGroup(projectGroup: any) {
        this.id = projectGroup.id || projectGroup.projectGoupId;
        this.projectId = projectGroup.projectId;
        this.name = projectGroup.name;
        this.userIds = projectGroup.userIds || [];
    }
}
