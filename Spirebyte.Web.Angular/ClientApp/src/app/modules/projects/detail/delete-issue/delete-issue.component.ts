import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssueModel, IssueType, IssueStatus } from '../../_models/issue.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IssueHTTPService } from '../../_services/issue-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-issue',
  templateUrl: './delete-issue.component.html',
  styleUrls: ['./delete-issue.component.scss']
})
export class DeleteIssueComponent implements OnInit, OnDestroy {
  types = IssueType;
  status = IssueStatus;
  issueKey: string;
  issue: IssueModel;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(private issueHttpService: IssueHTTPService,
      private router: Router, private route: ActivatedRoute) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe( params => {
      this.issueKey = params.get('issueKey');
      
      const issueSubscription = this.issueHttpService.getIssue(this.issueKey).subscribe(res => {
        this.issue = res;
        this.isLoadingSubject.next(false);
      });
      this.unsubscribe.push(issueSubscription);
    });
    this.unsubscribe.push(paramsSubscription);
  }

  delete(): void {
    this.issueHttpService.deleteIssue(this.issueKey).subscribe(res => {
      this.router.navigate(['../'], {
        relativeTo: this.route,
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
