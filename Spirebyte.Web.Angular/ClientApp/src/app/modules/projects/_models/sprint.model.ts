export class SprintModel {
    id: string;
    title: string;
    description: string;
    projectId: string;
    createdAt: Date;
    startedAt: Date;
    startDate: Date;
    endDate: Date;
    endedAt: Date;

    setSprint(sprint: any) {
        this.id = sprint.id;
        this.title = sprint.title;
        this.description = sprint.description;
        this.projectId = sprint.projectId;
        this.createdAt = sprint.createdAt;
        this.startedAt = sprint.startedAt;
        this.startDate = new Date(sprint.startDate.year, sprint.startDate.month - 1, sprint.startDate.day);
        this.endDate = new Date(sprint.endDate.year, sprint.endDate.month - 1, sprint.endDate.day);
        this.endedAt = sprint.endedAt;
    }
}
