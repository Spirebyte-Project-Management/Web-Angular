import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import stc from 'string-to-color';
import { IssueModel, IssueType } from '../../../_models/issue.model';
import { ProjectModel } from '../../../_models/project.model';
import { IssueEntityService } from '../../../_services/issues/issue-entity.service';
import { IssueHTTPService } from '../../../_services/issues/issue-http.service';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {

  @Input() projectId: string;
  public epics$: Observable<IssueModel[]>;
  public loadedEpics: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private issueEntityService: IssueEntityService) { }

  ngOnInit(): void {
    this.loadedEpics = this.issueEntityService.loaded$;
    this.epics$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.projectId == this.projectId && issue.type == IssueType.Epic)));
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

}
