export class SprintModel {
    id: string;
    title: string;
    description: string;
    projectId: string;
    issueIds: string[];
    createdAt: string;
    startedAt: string;
    startDate: string;
    endDate: string;
    endedAt: string;

    setSprint(sprint: any) {
        this.id = sprint.id;
        this.title = sprint.title;
        this.description = sprint.description;
        this.projectId = sprint.projectId;
        this.createdAt = sprint.createdAt;
        this.startedAt = sprint.startedAt;
        this.startDate = sprint.startDate;
        this.endDate = sprint.endDate;
        this.endedAt = sprint.endedAt;
    }

    createSprint(sprint: any) {
        this.id = sprint.id;
        this.title = sprint.title;
        this.description = sprint.description;
        this.projectId = sprint.projectId;
        this.createdAt = sprint.createdAt;
        this.startedAt = sprint.startedAt;
        this.startDate = new Date(sprint.startDate.year, sprint.startDate.month - 1, sprint.startDate.day).toISOString();
        this.endDate = new Date(sprint.endDate.year, sprint.endDate.month - 1, sprint.endDate.day).toISOString();
        this.endedAt = sprint.endedAt;
    }
}
