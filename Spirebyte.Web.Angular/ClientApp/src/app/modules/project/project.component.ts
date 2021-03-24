import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueModel } from '../data/_models/issue.model';
import { ProjectModel } from '../data/_models/project.model';
import { IssueEntityService } from '../data/_services/issues/issue-entity.service';
import { ProjectEntityService } from '../data/_services/projects/project-entity.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  issue$: Observable<IssueModel>;
  project$: Observable<ProjectModel>;

  private subscriptions: Subscription[] = [];


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private projectEntityService: ProjectEntityService,
    private issueEntityService: IssueEntityService) 
    { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.project$ = this.projectEntityService.entities$.pipe(map(projects => projects.find(project => project.id == params.get('key'))));
      })
    );

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
