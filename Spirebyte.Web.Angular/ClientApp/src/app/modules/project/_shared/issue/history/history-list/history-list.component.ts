import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IssueHistoryModel } from 'src/app/modules/project/issue-tracking/_models/issue-history.model';
import { IssueModel } from 'src/app/modules/project/issue-tracking/_models/issue.model';
import { loadIssueComments } from 'src/app/modules/project/issue-tracking/_store/issue.actions';
import { getSelectedIssueHistory } from 'src/app/modules/project/issue-tracking/_store/issue.selectors';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnChanges {

  @Input() issue: IssueModel;

  historyItems$: Observable<IssueHistoryModel[]>;

  constructor(private store: Store) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.historyItems$ = this.store.select(getSelectedIssueHistory);
  }

  ngOnInit(): void {
    this.historyItems$ = this.store.select(getSelectedIssueHistory);
  }

}
