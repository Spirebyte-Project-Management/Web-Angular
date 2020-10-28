export class IssueModel {
    id: string;
    key: string;
    type: IssueType;
    status: IssueStatus;
    title: string;
    description: string;
    storyPoints: number;
    projectId: string;
    assignees: string[];
    linkedIssues: string[];
    createdAt: string;

    setIssue(issue: any) {
        this.id = issue.id;
        this.key = issue.key;
        this.type = issue.type;
        this.status = issue.status;
        this.title = issue.title;
        this.description = issue.description;
        this.storyPoints = issue.storyPoints;
        this.projectId = issue.projectId;
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
