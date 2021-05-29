import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueModel } from '../data/_models/issue.model';
import { IssueEntityService } from '../data/_services/issues/issue-entity.service';
import { ProjectModel } from './_models/project.model';
import { getSelectedProject, hasSelectedProject } from './_store/project.selectors';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  issue$: Observable<IssueModel>;
  project$: Observable<ProjectModel>;
  hasSelectedProject$: Observable<boolean>;

  private subscriptions: Subscription[] = [];


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public store: Store,
    private issueEntityService: IssueEntityService) 
    { }

  ngOnInit(): void {
    this.project$ = this.store.select(getSelectedProject);
    this.hasSelectedProject$ = this.store.select(hasSelectedProject);

    this.subscriptions.push(
      this.route.queryParamMap.subscribe(params => {
        const issueId = params.get('selectedIssue');
        if (issueId != null) {
          this.issue$ = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == issueId)));
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
