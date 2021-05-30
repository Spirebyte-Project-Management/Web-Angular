import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IssueModel } from './issue-tracking/_models/issue.model';
import { getSelectedIssue } from './issue-tracking/_store/issue.selectors';
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
    public store: Store) 
    { }

  ngOnInit(): void {
    this.project$ = this.store.select(getSelectedProject);
    this.hasSelectedProject$ = this.store.select(hasSelectedProject);

    this.issue$ = this.store.select(getSelectedIssue);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
