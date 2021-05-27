import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { IssueCommentModel } from 'src/app/modules/data/_models/issue-comment.model';
import { IssueModel } from 'src/app/modules/data/_models/issue.model';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { IssueCommentEntityService } from 'src/app/modules/data/_services/issues/comments/issue-comment-entity.service';

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

  constructor(private authService: AuthService, private fb: FormBuilder, private issueCommentEntityService: IssueCommentEntityService) {
    this.comment = new IssueCommentModel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.comment.issueId = this.issue.id;
    this.comment.projectId = this.project.id;
  }

  ngOnInit(): void {
    this.comment.issueId = this.issue.id;
    this.comment.projectId = this.project.id;

    this.User$ = this.authService.currentUserSubject.pipe(tap(user => {
      this.comment.authorId = user.id;
    }));
  }

  sendComment(): void {
    let commentToPost = Object.assign({}, this.comment);
    this.issueCommentEntityService.add(commentToPost);
    this.comment.body = ""; 
  }
}
