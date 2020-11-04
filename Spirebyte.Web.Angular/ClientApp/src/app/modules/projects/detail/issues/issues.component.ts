import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueModel, IssueType } from '../../_models/issue.model';
import { IssueHTTPService } from '../../_services/issue-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectHTTPService } from '../../_services/project-http.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  issues$: Observable<IssueModel[]>;
  issueType = IssueType;
  projectKey: string;

  constructor(
    private issueHttpService: IssueHTTPService,
    private projectHttpService: ProjectHTTPService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe(params => {
      this.projectKey = params.get('key');

      this.issues$ = this.issueHttpService.getIssuesForProject(this.projectKey);
    });
  }

  setSelectedIssue(key: string): void{
         // changes the route without moving from the current view or
     // triggering a navigation event,
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedIssue: key
      }
    });
  }

}
