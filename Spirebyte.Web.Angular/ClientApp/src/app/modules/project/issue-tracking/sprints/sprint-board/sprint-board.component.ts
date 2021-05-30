import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintModel } from 'src/app/modules/data/_models/sprint.model';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';
import { SprintHTTPService } from 'src/app/modules/data/_services/sprints/sprint-http.service';
import { IssueStatus, IssueType, IssueModel } from '../../_models/issue.model';
import { getSelectedProjectIssuesBySprint } from '../../_store/issue.selectors';
import * as IssueActions from '../../_store/issue.actions';
import { IssueUpdateModel } from '../../_models/issue-update.model';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.scss']
})
export class SprintBoardComponent implements OnInit {

  sprint$: Observable<SprintModel>;
  sprintId: string;
  statuses = IssueStatus;
  issueType = IssueType;

  minDate = '0001-01-01T00:00:00Z';

  constructor(private sprintEntityService: SprintEntityService,
    private sprintHttpService: SprintHTTPService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe(params => {
      this.sprintId = params.get('sprintKey');
      this.sprint$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.find(sprint => sprint.id == this.sprintId)));
    });
  }

  getIssuesForSprintByStatus(sprintId: string, status: string): Observable<IssueModel[]> {
    return this.store.select(getSelectedProjectIssuesBySprint, { sprintId }).pipe(map(issues => issues.filter(issue => issue.status == IssueStatus[status as keyof typeof IssueStatus])));
  }

  endSprint(sprint: SprintModel) {
        // TODO: Update sprint id in issue when ending sprint
        // TODO: Update sprint id in issue when ending sprint
        // TODO: Update sprint id in issue when ending sprint
        // TODO: Update sprint id in issue when ending sprint

    this.sprintHttpService.endSprint(sprint.id).subscribe();
    let updateSprint = new SprintModel();
    updateSprint.setSprint(sprint);
    updateSprint.endedAt = new Date().toISOString();
    this.sprintEntityService.updateOneInCache(updateSprint);

    this.store.select(getSelectedProjectIssuesBySprint, { sprintId: sprint.id }).pipe(map(issues => issues.filter(issue => issue.status != IssueStatus.DONE))).subscribe(issues => {
      issues.forEach(doneIssue => {
        let updateissue: Update<IssueUpdateModel> = {
          id: doneIssue.id,
          changes: { sprintId: null, status: IssueStatus.DONE }
        };
        this.store.dispatch(IssueActions.updateIssueInStore({ issue: updateissue }));
      });
    });

    this.router.navigate(['../../backlog'], {
      relativeTo: this.route
    });
  }

  issueDropped(event: CdkDragDrop<IssueModel[]>) {
    if (event.container.id == event.previousContainer.id)
      return;

    let issue = new IssueUpdateModel();
    issue.setIssueUpdate(event.item.data);
    issue.status = IssueStatus[event.container.id as keyof typeof IssueStatus]

    let updateissue: Update<IssueUpdateModel> = {
      id: event.item.data.id,
      changes: { sprintId: event.container.id }
    };
    this.store.dispatch(IssueActions.updateIssueInStore({ issue: updateissue }));

    this.store.dispatch(IssueActions.updateIssue({ issue }));

   
  }

  daysRemaining(endDate) {
    let date = new Date(endDate);
    let currentDate = new Date();

    let days = Math.floor((date.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }
}
