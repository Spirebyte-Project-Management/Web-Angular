export class IssueCommentModel {
    id: string;
    issueId: string;
    projectId: string;
    authorId: string;
    body: string;
    createdAt: string;
    reations: ReactionModel[];

    constructor(){
        this.id = '';
        this.issueId = '';
        this.projectId = '';
        this.authorId = '';
        this.body = '';
        this.createdAt = null;
    }

    setIssueComment(comment: any) {
        this.id = comment.id;
        this.issueId = comment.issueId;
        this.projectId = comment.projectId;
        this.authorId = comment.authorId;
        this.body = comment.body;
        this.createdAt = comment.createdAt;
        this.reations = comment.reactions;
    }
}

export class ReactionModel {
    characterCode: string;
    commenterId: string;
}