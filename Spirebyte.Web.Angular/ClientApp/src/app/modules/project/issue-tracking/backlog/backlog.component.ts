import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintModel } from 'src/app/modules/data/_models/sprint.model';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';
import { SprintHTTPService } from 'src/app/modules/data/_services/sprints/sprint-http.service';
import { IssuePermissionKeys } from 'src/app/_metronic/core/constants/IssuePermissionKeys';
import { SprintPermissionKeys } from 'src/app/_metronic/core/constants/SprintPermissionKeys';
import { getSelectedProjectId } from '../../_store/project.selectors';
import { CreateIssueComponent } from '../issues/create-issue/create-issue.component';
import { CreateSprintComponent } from '../sprints/create-sprint/create-sprint.component';
import { IssueUpdateModel } from '../_models/issue-update.model';
import { IssueModel, IssueType } from '../_models/issue.model';
import { updateIssueInStore } from '../_store/issue.actions';
import { getSelectedProjectBacklog, getSelectedProjectBacklogFiltered, getSelectedProjectBacklogIssueCount, getSelectedProjectIssuesBySprint, getSelectedProjectIssuesBySprintFiltered, projectHasIssues } from '../_store/issue.selectors';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  loadedIssues: Observable<boolean>;
  sprints$: Observable<SprintModel[]>;
  backlog$: Observable<IssueModel[]>;
  backlogCount$: Observable<number>;
  issueType = IssueType;
  projectId: string;

  projectId$: Observable<string>;


  sprintPermissionKeys = SprintPermissionKeys;
  issuePermissionKeys = IssuePermissionKeys;

  minDate = '0001-01-01T00:00:00Z';

  backlogKey = 'backlog';

  constructor(
    private store: Store,
    private sprintEntityService: SprintEntityService,
    private sprintHttpService: SprintHTTPService,
    private modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.projectId$ = this.store.select(getSelectedProjectId);
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe(params => {
      this.projectId = params.get('key');

      this.loadedIssues = this.store.select(projectHasIssues);
      this.sprints$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.filter(sprint => sprint.projectId == this.projectId && sprint.endedAt == this.minDate)));

      this.backlog$ = this.store.select(getSelectedProjectBacklogFiltered);
      this.backlogCount$ = this.store.select(getSelectedProjectBacklogFiltered).pipe(map(issues => issues.length));
    });
  }

  getIssuesForSprint(sprintId: string): Observable<IssueModel[]> {
    return this.store.select(getSelectedProjectIssuesBySprintFiltered, { sprintId })
  }

  getIssueCountForSprint(sprintId: string): Observable<number> {
    return this.store.select(getSelectedProjectIssuesBySprintFiltered, { sprintId }).pipe(map(issues => issues.length));
  }

  startSprint(sprint: SprintModel){
    this.sprintHttpService.startSprint(sprint.id).subscribe();
    let updateSprint = new SprintModel();
    updateSprint.setSprint(sprint);
    updateSprint.startedAt = new Date().toISOString();
    this.sprintEntityService.updateOneInCache(updateSprint);
  }

  issueDropped(event: CdkDragDrop<IssueModel[]>){
    if(event.container.id == event.previousContainer.id)
      return;

    if (event.container.id === this.backlogKey && event.previousContainer.id !== this.backlogKey){
      this.sprintHttpService.removeIssueFromSprint(event.previousContainer.id, event.item.data.id).subscribe();
      let issue: Update<IssueUpdateModel> = {
        id: event.item.data.id,
        changes: { sprintId: null }
      };
      this.store.dispatch(updateIssueInStore({ issue }));

    }
    else{
      this.sprintHttpService.addIssueToSprint(event.container.id, event.item.data.id).subscribe();
      let issue: Update<IssueUpdateModel> = {
        id: event.item.data.id,
        changes: { sprintId: event.container.id }
      };
      this.store.dispatch(updateIssueInStore({ issue }));
    }

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);

  }

  createIssue(projectId: string) {
    const modalRef = this.modalService.open(CreateIssueComponent, { size: 'md' });
    modalRef.componentInstance.projectId = projectId;
  }

  createSprint(projectId: string) {
    const modalRef = this.modalService.open(CreateSprintComponent, { size: 'md' });
    modalRef.componentInstance.projectId = projectId;
  }
}
