import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IssueModel, IssueType, IssueStatus } from 'src/app/modules/data/_models/issue.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  loadedIssues: Observable<boolean>;
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
    this.loadedIssues = this.issueEntityService.loaded$;
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
