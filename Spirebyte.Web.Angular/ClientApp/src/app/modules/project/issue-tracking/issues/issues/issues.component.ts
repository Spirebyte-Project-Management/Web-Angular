import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuePermissionKeys } from 'src/app/_metronic/core/constants/IssuePermissionKeys';
import { Store } from '@ngrx/store';
import { getSelectedProjectIssues, projectHasIssues } from '../../_store/issue.selectors';
import { IssueModel, IssueType, IssueStatus } from '../../_models/issue.model';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getSelectedProjectId } from '../../../_store/project.selectors';

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

  projectId$: Observable<string>;


  issuePermissionKeys = IssuePermissionKeys;

  constructor(
    private store: Store,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadedIssues = this.store.select(projectHasIssues);
    this.issues$ = this.store.select(getSelectedProjectIssues);
    this.projectId$ = this.store.select(getSelectedProjectId);
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

  createIssue(projectId: string) {
    const modalRef = this.modalService.open(CreateIssueComponent, { size: 'md' });
    modalRef.componentInstance.projectId = projectId;
  }

}
