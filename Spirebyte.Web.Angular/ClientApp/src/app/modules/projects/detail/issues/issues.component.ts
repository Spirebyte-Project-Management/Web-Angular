import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueModel, IssueStatus, IssueType } from '../../_models/issue.model';
import { IssueHTTPService } from '../../_services/issues/issue-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectHTTPService } from '../../_services/projects/project-http.service';
import { IssueEntityService } from '../../_services/issues/issue-entity.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  issues$: Observable<IssueModel[]>;
  issueType = IssueType;
  doneStatus = IssueStatus.DONE;
  projectKey: string;

  constructor(
    private issueEntityService: IssueEntityService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe(params => {
      let projectId = params.get('key');
      this.issues$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.projectId == projectId)));
    });
  }
  
  isSelected(url): boolean {
    return this.router.url.includes(url);
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
