import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueModel, IssueType, IssueStatus } from 'src/app/modules/data/_models/issue.model';
import { SprintModel } from 'src/app/modules/data/_models/sprint.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';
import { SprintHTTPService } from 'src/app/modules/data/_services/sprints/sprint-http.service';
import { IssuePermissionKeys } from 'src/app/_metronic/core/constants/IssuePermissionKeys';
import { SprintPermissionKeys } from 'src/app/_metronic/core/constants/SprintPermissionKeys';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  loadedIssues: Observable<boolean>;
  sprints$: Observable<SprintModel[]>;
  backlog$: Observable<IssueModel[]>;
  backlogCount$: Observable<number>;
  issueType = IssueType;
  projectId: string;

  sprintPermissionKeys = SprintPermissionKeys;
  issuePermissionKeys = IssuePermissionKeys;

  minDate = '0001-01-01T00:00:00Z';

  backlogKey = 'backlog';
  private sprintIssues: Map<string, IssueModel[]>;


  constructor(
    private issueEntityService: IssueEntityService,
    private sprintEntityService: SprintEntityService,
    private sprintHttpService: SprintHTTPService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe(params => {
      this.projectId = params.get('key');

      this.loadedIssues = this.issueEntityService.loaded$;
      this.sprints$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.filter(sprint => sprint.projectId == this.projectId && sprint.endedAt == this.minDate)));

      this.backlog$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.projectId == this.projectId &&  issue.sprintId == null && issue.type != IssueType.Epic && issue.status != IssueStatus.DONE)));
      this.backlogCount$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.projectId == this.projectId &&  issue.sprintId == null && issue.type != IssueType.Epic && issue.status != IssueStatus.DONE).length));
    });
  }

  getIssuesForSprint(sprintId: string): Observable<IssueModel[]> {
    return this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.sprintId == sprintId && issue.type != IssueType.Epic && issue.status != IssueStatus.DONE)));
  }

  getIssueCountForSprint(sprintId: string): Observable<number> {
    return this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.sprintId == sprintId && issue.type != IssueType.Epic && issue.status != IssueStatus.DONE).length));
  }

  startSprint(sprint: SprintModel){
    this.sprintHttpService.startSprint(sprint.id).subscribe();
    let updateSprint = new SprintModel();
    updateSprint.setSprint(sprint);
    updateSprint.startedAt = new Date().toISOString();
    this.sprintEntityService.updateOneInCache(updateSprint);
  }

  issueDropped(event: CdkDragDrop<IssueModel[]>){
    if(event.container.id == event.previousContainer.id)
      return;

    if (event.container.id === this.backlogKey && event.previousContainer.id !== this.backlogKey){
      this.sprintHttpService.removeIssueFromSprint(event.previousContainer.id, event.item.data.id).subscribe();
      let issue = new IssueModel();
      issue.setIssue(event.item.data);
      issue.sprintId = null;
      this.issueEntityService.updateOneInCache(issue);

    }
    else{
      this.sprintHttpService.addIssueToSprint(event.container.id, event.item.data.id).subscribe();
      let issue = new IssueModel();
      issue.setIssue(event.item.data);
      issue.sprintId = event.container.id;
      this.issueEntityService.updateOneInCache(issue);

    }

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);

  }
}
