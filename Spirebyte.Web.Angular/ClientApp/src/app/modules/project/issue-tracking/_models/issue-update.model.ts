import { IssueType, IssueStatus } from "./issue.model";

export class IssueUpdateModel {
    id: string;
    type: IssueType;
    status: IssueStatus;
    title: string;
    description: string;
    storyPoints: number;
    epicId: string;
    sprintId: string;
    assignees: string[];
    linkedIssues: string[];


    setIssueUpdate(issue: any) {
        this.id = issue.id;
        this.type = issue.type;
        this.status = issue.status;
        this.title = issue.title;
        this.description = issue.description;
        this.storyPoints = issue.storyPoints;
        this.epicId = issue.epicId;
        this.sprintId = issue.sprintId;
        this.assignees = issue.assignees;
        this.linkedIssues = issue.linkedIssues;
    }
}