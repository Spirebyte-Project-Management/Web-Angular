export class IssueModel {
    id: string;
    type: IssueType;
    status: IssueStatus;
    title: string;
    description: string;
    storyPoints: number;
    projectId: string;
    epicId: string;
    sprintId: string;
    assignees: string[];
    linkedIssues: string[];
    createdAt: string;

    setIssue(issue: any) {
        this.id = issue.id;
        this.type = issue.type;
        this.status = issue.status;
        this.title = issue.title;
        this.description = issue.description;
        this.storyPoints = issue.storyPoints;
        this.projectId = issue.projectId;
        this.epicId = issue.epicId;
        this.assignees = issue.assignees;
        this.linkedIssues = issue.linkedIssues;
        this.createdAt = issue.createdAt;
    }
}

export enum IssueType {
    Story,
    Task,
    SubTask,
    Bug,
    Epic
}

export enum IssueStatus {
    TODO,
    INPROGRESS,
    DONE,
}
