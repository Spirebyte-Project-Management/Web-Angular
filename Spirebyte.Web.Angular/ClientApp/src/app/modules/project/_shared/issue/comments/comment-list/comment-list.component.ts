import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueCommentModel } from 'src/app/modules/project/issue-tracking/_models/issue-comment.model';
import { Store } from '@ngrx/store';
import { IssueModel } from 'src/app/modules/project/issue-tracking/_models/issue.model';
import { getSelectedIssueComments } from 'src/app/modules/project/issue-tracking/_store/issue.selectors';
import { loadIssueComments } from 'src/app/modules/project/issue-tracking/_store/issue.actions';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() issue: IssueModel;

  comments$: Observable<IssueCommentModel[]>;

  constructor(private store: Store) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.comments$ = this.store.select(getSelectedIssueComments);
  }

  ngOnInit(): void {
    this.comments$ = this.store.select(getSelectedIssueComments);
  }
}
