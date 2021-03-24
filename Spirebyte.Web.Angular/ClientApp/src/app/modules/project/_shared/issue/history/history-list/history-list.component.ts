import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueHistoryModel } from 'src/app/modules/data/_models/issue-history.model';
import { IssueModel } from 'src/app/modules/data/_models/issue.model';
import { IssueHistoryEntityService } from 'src/app/modules/data/_services/issues/history/issue-history-entity.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnChanges {

  @Input() issue: IssueModel;

  historyItems$: Observable<IssueHistoryModel[]>;

  constructor(private issueHistoryEntityService: IssueHistoryEntityService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getHistoryItems().then();
    this.historyItems$ = this.issueHistoryEntityService.entities$.pipe(map(historyItems => historyItems.filter(history => history.issueId == this.issue.id)));
  }

  ngOnInit(): void {
    this.getHistoryItems().then();
    this.historyItems$ = this.issueHistoryEntityService.entities$.pipe(map(historyItems => historyItems.filter(history => history.issueId == this.issue.id)));
  }

  async getHistoryItems() {
    const result = await this.issueHistoryEntityService.getWithQuery({issueId: this.issue.id}).toPromise();
 
    // do what you want with result 
 
    return result;
 }

}
