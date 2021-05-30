import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import stc from 'string-to-color';
import { IssueModel } from '../../../_models/issue.model';
import { selectEpic } from '../../../_store/issue.actions';
import { getSelectedEpicId, getSelectedProjectEpics, hasSelectedEpic, projectHasIssues } from '../../../_store/issue.selectors';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {

  public epics$: Observable<IssueModel[]>;
  public selectedEpic$: Observable<string>;
  public hasSelectedEpic$: Observable<boolean>;
  public loadedEpics: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
    this.loadedEpics = this.store.select(projectHasIssues);
    this.epics$ = this.store.select(getSelectedProjectEpics);
    this.selectedEpic$ = this.store.select(getSelectedEpicId);
    this.hasSelectedEpic$ = this.store.select(hasSelectedEpic);
  }

  public epicColor(epicKey: string): string {
    return stc(epicKey);
  }

  setSelectedIssue(key: string): void {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedIssue: key
      }
    });
  }

  isSelected(url): boolean {
    return this.router.url.includes('=' + url);
  } 

  selectEpic(epicId: string){
    this.store.dispatch(selectEpic({ epicId }));
  }

}
