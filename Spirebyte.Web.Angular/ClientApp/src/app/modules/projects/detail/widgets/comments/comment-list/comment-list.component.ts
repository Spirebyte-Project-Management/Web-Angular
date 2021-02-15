import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { comment } from 'postcss';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CommentModel } from 'src/app/modules/projects/_models/comment.model';
import { IssueModel } from 'src/app/modules/projects/_models/issue.model';
import { CommentEntityService } from 'src/app/modules/projects/_services/issues/comments/comment-entity.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() issue: IssueModel;

  comments$: Observable<CommentModel[]>;

  constructor(private commentEntityService: CommentEntityService) { }

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
