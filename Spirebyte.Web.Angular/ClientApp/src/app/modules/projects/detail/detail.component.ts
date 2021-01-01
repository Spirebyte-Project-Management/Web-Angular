import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, BehaviorSubject, of } from 'rxjs';
import { ProjectModel } from '../_models/project.model';
import { ProjectHTTPService } from '../_services/projects/project-http.service';
import { UserModel } from '../../auth/_models/user.model';
import { first, map, single, take, tap } from 'rxjs/operators';
import { UserHTTPService } from '../_services/users/user-http.service';
import { IssueModel, IssueType, IssueStatus } from '../_models/issue.model';
import { IssueHTTPService } from '../_services/issues/issue-http.service';
import { ProjectEntityService } from '../_services/projects/project-entity.service';
import { IssueEntityService } from '../_services/issues/issue-entity.service';
import { UserEntityService } from '../_services/users/user-entity.service';
import { SprintModel } from '../_models/Sprint.model';
import { SprintEntityService } from '../_services/sprints/sprint-entity.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  projectId: string;

  issueType = IssueType;
  issueStatus = IssueStatus;

  issue$: Observable<IssueModel>;
  project$: Observable<ProjectModel>;

  assignees$: Observable<UserModel[]>;

  projectUsers$: Observable<UserModel[]>;

  activeSprints$: Observable<SprintModel[]>;
  minDate = '0001-01-01T00:00:00';


  private unsubscribe: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private projectEntityService: ProjectEntityService,
    private userEntityService: UserEntityService,
    private issueEntityService: IssueEntityService,
    private sprintEntityService: SprintEntityService
  ) {
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe(params => {
      this.projectId = params.get('key');
    });

    const queryParamsSubscription = this.route.queryParamMap.subscribe(params => {
      const issueId = params.get('selectedIssue');
      if (issueId != null) {
        this.issue$ = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == issueId)));
      }
    });
    this.unsubscribe.push(paramsSubscription);
    this.unsubscribe.push(queryParamsSubscription);

    this.project$ = this.projectEntityService.entities$.pipe(map(projects => projects.find(project => project.id == this.projectId)));
    this.projectUsers$ = this.userEntityService.entities$;
    this.activeSprints$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.filter(sprint => sprint.projectId == this.projectId && sprint.startedAt != this.minDate && sprint.endedAt == this.minDate)));
  }

  isActive(url): boolean {
    return this.router.url.includes(url);
  } 

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
