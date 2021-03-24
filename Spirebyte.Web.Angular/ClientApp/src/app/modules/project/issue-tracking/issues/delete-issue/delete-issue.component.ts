import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IssueType, IssueStatus, IssueModel } from 'src/app/modules/data/_models/issue.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';

@Component({
  selector: 'app-delete-issue',
  templateUrl: './delete-issue.component.html',
  styleUrls: ['./delete-issue.component.scss']
})
export class DeleteIssueComponent implements OnInit, OnDestroy {
  types = IssueType;
  status = IssueStatus;
  issueId: string;
  issue: IssueModel;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(private issueEntityService: IssueEntityService,
      private router: Router, private route: ActivatedRoute) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe( params => {
      this.issueId = params.get('issueKey');
      
      const issueSubscription = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == this.issueId))).subscribe(res => {
        this.issue = res;
        this.isLoadingSubject.next(false);
      });
      this.unsubscribe.push(issueSubscription);
    });
    this.unsubscribe.push(paramsSubscription);
  }

  delete(): void {
    this.issueEntityService.delete(this.issueId).subscribe(res => {
      this.router.navigate(['../'], {
        relativeTo: this.route,
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
