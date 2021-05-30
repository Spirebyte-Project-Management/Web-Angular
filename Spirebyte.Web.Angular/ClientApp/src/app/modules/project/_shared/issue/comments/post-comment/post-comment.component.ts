import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IssueCommentModel } from 'src/app/modules/project/issue-tracking/_models/issue-comment.model';
import { IssueModel } from 'src/app/modules/project/issue-tracking/_models/issue.model';
import { addIssueComment } from 'src/app/modules/project/issue-tracking/_store/issue.actions';
import { ProjectModel } from 'src/app/modules/project/_models/project.model';
import { UserModel } from 'src/app/_models/user.model';
import { getAuthenticatedUser } from 'src/app/_store/auth/auth.selectors';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit, OnChanges {

  Editor = InlineEditor;

  @Input() issue: IssueModel;
  @Input() project: ProjectModel;

  comment: IssueCommentModel;

  User$: Observable<UserModel>;

  constructor(private store: Store, private fb: FormBuilder) {
    this.comment = new IssueCommentModel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.comment.issueId = this.issue.id;
    this.comment.projectId = this.project.id;
  }

  ngOnInit(): void {
    this.comment.issueId = this.issue.id;
    this.comment.projectId = this.project.id;

    this.User$ = this.store.select(getAuthenticatedUser).pipe(tap(user => {
      this.comment.authorId = user.id;
    }));
  }

  sendComment(): void {
    let commentToPost = Object.assign({}, this.comment);
    this.store.dispatch(addIssueComment({ issueComment: commentToPost}));
    this.comment.body = ""; 
  }
}
