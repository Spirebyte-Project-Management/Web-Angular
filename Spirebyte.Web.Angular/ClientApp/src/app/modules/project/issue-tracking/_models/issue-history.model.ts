export class IssueHistoryModel {
    id: string;
    issueId: string;
    userId: string;
    action: HistoryTypes;
    createdAt: string;
    changedFields: Field[];

    constructor(){
        this.id = '';
        this.issueId = '';
        this.userId = '';
        this.action = HistoryTypes.Created;
        this.createdAt = null;
    }
}

export class Field {
    fieldName: string;
    valueBefore: string;
    valueAfter: string;
    fieldType: FieldTypes
}

export enum HistoryTypes {
    Created,
    Updated
}

export enum FieldTypes {
    String,
    Status,
    Type,
    Assignees,
    Epic,
    Sprint,
    LinkedIssues
}