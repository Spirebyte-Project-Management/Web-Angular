import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueStatus, IssueType, IssueModel } from 'src/app/modules/data/_models/issue.model';
import { SprintModel } from 'src/app/modules/data/_models/sprint.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';
import { SprintHTTPService } from 'src/app/modules/data/_services/sprints/sprint-http.service';

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

  minDate = '0001-01-01T00:00:00';

  constructor(private sprintEntityService: SprintEntityService,
    private sprintHttpService: SprintHTTPService,
    private issueEntityService: IssueEntityService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe(params => {
      this.sprintId = params.get('sprintKey');
      this.sprint$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.find(sprint => sprint.id == this.sprintId)));
    });
  }

  getIssuesForSprintByStatus(sprintId: string, status: string): Observable<IssueModel[]> {
    return this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.sprintId == sprintId && issue.status == IssueStatus[status as keyof typeof IssueStatus] && issue.type != IssueType.Epic)));
  }

  endSprint(sprint: SprintModel) {
    this.sprintHttpService.endSprint(sprint.id).subscribe();
    let updateSprint = new SprintModel();
    updateSprint.setSprint(sprint);
    updateSprint.endedAt = new Date().toISOString();
    this.sprintEntityService.updateOneInCache(updateSprint);

    this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.sprintId == sprint.id && issue.status != IssueStatus.DONE && issue.type != IssueType.Epic))).subscribe(issues => {
      issues.forEach(doneIssue => {
        let issue = new IssueModel();
        issue.setIssue(doneIssue);
        issue.sprintId = null;
        this.issueEntityService.updateOneInCache(issue);
      });
    });

    this.router.navigate(['../../backlog'], {
      relativeTo: this.route
    });
  }

  issueDropped(event: CdkDragDrop<IssueModel[]>) {
    if (event.container.id == event.previousContainer.id)
      return;

    let issue = new IssueModel();
    issue.setIssue(event.item.data);
    issue.status = IssueStatus[event.container.id as keyof typeof IssueStatus]
    this.issueEntityService.update(issue);

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  daysRemaining(endDate) {
    let date = new Date(endDate);
    let currentDate = new Date();

    let days = Math.floor((date.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }
}
