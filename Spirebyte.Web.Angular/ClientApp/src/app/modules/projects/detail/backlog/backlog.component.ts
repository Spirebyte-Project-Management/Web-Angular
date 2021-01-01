import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IssueModel, IssueStatus, IssueType } from '../../_models/issue.model';
import { SprintModel } from '../../_models/Sprint.model';
import { IssueEntityService } from '../../_services/issues/issue-entity.service';
import { IssueHTTPService } from '../../_services/issues/issue-http.service';
import { ProjectHTTPService } from '../../_services/projects/project-http.service';
import { SprintEntityService } from '../../_services/sprints/sprint-entity.service';
import { SprintHTTPService } from '../../_services/sprints/sprint-http.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  sprints$: Observable<SprintModel[]>;
  backlog$: Observable<IssueModel[]>;
  backlogCount$: Observable<number>;
  issueType = IssueType;
  projectId: string;

  minDate = '0001-01-01T00:00:00';

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
    });
    this.sprints$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.filter(sprint => sprint.projectId == this.projectId && sprint.endedAt == this.minDate)));

    this.backlog$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.projectId == this.projectId &&  issue.sprintId == null && issue.type != IssueType.Epic && issue.status != IssueStatus.DONE)));
    this.backlogCount$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.projectId == this.projectId &&  issue.sprintId == null && issue.type != IssueType.Epic && issue.status != IssueStatus.DONE).length));
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
