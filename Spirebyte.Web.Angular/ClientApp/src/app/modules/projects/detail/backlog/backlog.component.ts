import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IssueModel, IssueType } from '../../_models/issue.model';
import { SprintModel } from '../../_models/Sprint.model';
import { IssueHTTPService } from '../../_services/issue-http.service';
import { ProjectHTTPService } from '../../_services/project-http.service';
import { SprintHTTPService } from '../../_services/sprint-http.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  backlog$: Observable<IssueModel[]>;
  sprints$: Observable<SprintModel[]>;
  issueType = IssueType;
  projectKey: string;

  constructor(
    private issueHttpService: IssueHTTPService,
    private sprintHttpService: SprintHTTPService,
    private projectHttpService: ProjectHTTPService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe(params => {
      this.projectKey = params.get('key');

      this.backlog$ = this.issueHttpService.getIssuesForProject(this.projectKey);
      this.sprints$ = this.sprintHttpService.getSprintsForProject(this.projectKey);
    });
  }
}
