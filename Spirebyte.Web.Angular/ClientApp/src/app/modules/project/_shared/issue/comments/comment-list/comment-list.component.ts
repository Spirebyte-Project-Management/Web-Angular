import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { comment } from 'postcss';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IssueCommentModel } from 'src/app/modules/data/_models/issue-comment.model';
import { IssueModel } from 'src/app/modules/data/_models/issue.model';
import { IssueCommentEntityService } from 'src/app/modules/data/_services/issues/comments/issue-comment-entity.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() issue: IssueModel;

  comments$: Observable<IssueCommentModel[]>;

  constructor(private commentEntityService: IssueCommentEntityService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getComments().then();
    this.comments$ = this.commentEntityService.entities$.pipe(map(comments => comments.filter(comment => comment.issueId == this.issue.id)));
  }

  ngOnInit(): void {
    this.getComments().then();
    this.comments$ = this.commentEntityService.entities$.pipe(map(comments => comments.filter(comment => comment.issueId == this.issue.id)));
  }

  async getComments() {
    const result = await this.commentEntityService.getWithQuery({issueId: this.issue.id}).toPromise();
 
    // do what you want with result 
 
    return result;
 }

}
