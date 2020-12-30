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


  private unsubscribe: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private projectEntityService: ProjectEntityService,
    private userEntityService: UserEntityService,
    private issueEntityService: IssueEntityService
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
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
