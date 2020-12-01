import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, BehaviorSubject, of } from 'rxjs';
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

  issueType = IssueType;
  issueStatus = IssueStatus;

  private issueSubject: BehaviorSubject<IssueModel>;
  issue$: Observable<IssueModel>;

  assignees$: Observable<UserModel[]>;

  private project: ProjectModel;
  private projectUsers: UserModel[];


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
    });

    const queryParamsSubscription = this.route.queryParamMap.subscribe(params => {
      const issueKey = params.get('selectedIssue');
      if (issueKey != null) {
        const issueSubscription = this.issueHttpService
          .getIssue(issueKey)
          .subscribe(result => {
            this.issueSubject.next(result);
          });
        this.unsubscribe.push(issueSubscription);
      }
    });
    this.unsubscribe.push(paramsSubscription);
    this.unsubscribe.push(queryParamsSubscription);
  }

  getProject(): Observable<ProjectModel> {
    if (this.project !== undefined) {
      return of(this.project);
    }
    return this.projectHttpService.getProject(this.projectKey).pipe(tap(res => this.project = res));
  }

  getProjectUsers(ownerId: string, projectUsers: string[]): Observable<UserModel[]> {
    if (this.projectUsers !== undefined) {
      return of(this.projectUsers);
    }
    const ids = projectUsers;
    ids.push(ownerId);

    return this.userHttpService.getUsersWithIds(ids).pipe(tap(res => this.projectUsers = res));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
