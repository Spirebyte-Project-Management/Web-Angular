import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { CommentModel } from 'src/app/modules/projects/_models/comment.model';
import { IssueModel } from 'src/app/modules/projects/_models/issue.model';
import { ProjectModel } from 'src/app/modules/projects/_models/project.model';
import { CommentEntityService } from 'src/app/modules/projects/_services/issues/comments/comment-entity.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit, OnChanges {

  Editor = InlineEditor;

  @Input() issue: IssueModel;
  @Input() project: ProjectModel;

  comment: CommentModel;

  User$: Observable<UserModel>;

  constructor(private authService: AuthService, private fb: FormBuilder, private commentEntityService: CommentEntityService) {
    this.comment = new CommentModel();
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

    console.log(this.comment);

  }

  sendComment(): void {
    let commentToPost = Object.assign({}, this.comment);
    this.commentEntityService.add(commentToPost);
    this.comment.body = ""; 
  }
}
