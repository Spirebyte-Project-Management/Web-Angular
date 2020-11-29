import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IssueModel, IssueType } from '../../_models/issue.model';
import { SprintModel } from '../../_models/Sprint.model';
import { IssueHTTPService } from '../../_services/issue-http.service';
import { ProjectHTTPService } from '../../_services/project-http.service';
import { SprintHTTPService } from '../../_services/sprint-http.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  sprints$: Observable<SprintModel[]>;
  issueType = IssueType;
  projectKey: string;

  private backlogKey = 'backlog';
  private sprintIssues: Map<string, IssueModel[]>;


  constructor(
    private issueHttpService: IssueHTTPService,
    private sprintHttpService: SprintHTTPService,
    private projectHttpService: ProjectHTTPService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    this.sprintIssues = new Map<string, IssueModel[]>();
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe(params => {
      this.projectKey = params.get('key');

      this.sprints$ = this.sprintHttpService.getSprintsForProject(this.projectKey);
    });
  }

  getBacklog(): Observable<IssueModel[]>{
    if (this.sprintIssues.has(this.backlogKey)){
      return of(this.sprintIssues.get(this.backlogKey));
    }
    return this.issueHttpService.getBacklogForProject(this.projectKey).pipe(tap(res => this.sprintIssues.set(this.backlogKey, res)));
  }

  getIssuesForSprint(sprint: SprintModel): Observable<IssueModel[]> {
    if (this.sprintIssues.has(sprint.key)){
      return of(this.sprintIssues.get(sprint.key));
    }
    return this.issueHttpService.getIssuesWithIds(sprint.issueIds).pipe(tap(res => this.sprintIssues.set(sprint.key, res)));
  }

  issueDropped(event: CdkDragDrop<IssueModel[]>){
    if (event.container.id === 'backlog'){
      this.sprintHttpService.removeIssueFromSprint(event.previousContainer.id, event.item.data.key).subscribe();
    }
    else{
      this.sprintHttpService.addIssueToSprint(event.container.id, event.item.data.key).subscribe();
    }

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }
}
