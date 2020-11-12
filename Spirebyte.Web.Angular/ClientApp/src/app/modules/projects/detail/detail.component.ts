import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ProjectModel } from '../_models/project.model';
import { ProjectHTTPService } from '../_services/project-http.service';
import { UserModel } from '../../auth/_models/user.model';
import { map, tap } from 'rxjs/operators';
import { UserHTTPService } from '../_services/user-http.service';
import { IssueModel, IssueType, IssueStatus } from '../_models/issue.model';
import { IssueHTTPService } from '../_services/issue-http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  projectKey: string;
  project$: Observable<ProjectModel>;

  issueType = IssueType;
  issueStatus = IssueStatus;

  private issueSubject: BehaviorSubject<IssueModel>;
  issue$: Observable<IssueModel>;

  projectUsers$: Observable<UserModel[]>;
  assignees$: Observable<UserModel[]>;

  private unsubscribe: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private projectHttpService: ProjectHTTPService,
    private userHttpService: UserHTTPService,
    private issueHttpService: IssueHTTPService
  ) {
    this.issueSubject = new BehaviorSubject<IssueModel>(null);
    this.issue$ = this.issueSubject.asObservable();
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe(params => {
      this.projectKey = params.get('key');
      this.project$ = this.projectHttpService.getProject(this.projectKey).pipe(
        tap(res => {
          const ids = res.projectUserIds;
          ids.push(res.ownerUserId);

          this.projectUsers$ = this.userHttpService.getUsersWithIds(ids);
        })
      );
    });

    const queryParamsSubscription = this.route.queryParamMap.subscribe(params => {
      const issueKey = params.get('selectedIssue');
      if (issueKey != null) {
        const issueSubscription = this.issueHttpService
          .getIssue(issueKey)
          .subscribe(result => {
            if (result.assignees.length === 0) {
              this.assignees$ = this.userHttpService.getUsersWithIds(result.assignees);
            }
            this.issueSubject.next(result);
          });
        this.unsubscribe.push(issueSubscription);
      }
    });
    this.unsubscribe.push(paramsSubscription);
    this.unsubscribe.push(queryParamsSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
