import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, GroupedObservable, Observable, of, Subscription, zip } from 'rxjs';
import { groupBy, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';
import { environment } from 'src/environments/environment';
import { ChangeDescriptionModalComponent } from './_components/change-description-modal/change-description-modal.component';
import { RevertToDefaultModalComponent } from './_components/revert-to-default-modal/revert-to-default-modal.component';
import { Store } from '@ngrx/store';
import { ProjectModel } from '../../_models/project.model';
import { getSelectedProject, getSelectedProjectGroups } from '../../_store/project.selectors';
import * as ProjectActions from '../../_store/project.actions';

@Component({
  selector: 'app-permission-scheme',
  templateUrl: './permission-scheme.component.html',
  styleUrls: ['./permission-scheme.component.scss']
})
export class PermissionSchemeComponent implements OnInit {

  project$: Observable<ProjectModel>;
  projectGroups$: Observable<ProjectGroupModel[]>;
  permissionScheme$: Observable<PermissionSchemeModel>;
  private subscriptions: Subscription[] = [];

  defaultPermissionSchemeId = environment.defaultPermissionSchemeId;

  constructor(
    private store: Store,
    private permissionSchemeEntityService: PermissionSchemeEntityService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.project$ = this.store.select(getSelectedProject).pipe(
      tap(project => this.permissionScheme$ = this.permissionSchemeEntityService.entities$.pipe(
        map(permissionScheme => permissionScheme.find(permissionScheme => permissionScheme.id == project.permissionSchemeId))
      ))
    );
    this.projectGroups$ = this.store.select(getSelectedProjectGroups);
  }

  groupPermissions(permissions: PermissionModel[]): Observable<GroupedObservable<string, PermissionModel>> {
    return from(permissions).pipe(groupBy(p => p.permissionGroup));
  }

  createCustomPermissionScheme(project: ProjectModel) {
    let customPermissionSchemeId = new PermissionSchemeModel();
    customPermissionSchemeId.projectId = project.id;
    this.permissionSchemeEntityService.add(customPermissionSchemeId).subscribe(permissionScheme => {
      this.store.dispatch(ProjectActions.getSingleProject({ projectId: permissionScheme.projectId }));
    });
  }

  changeDescription(permissionScheme: PermissionSchemeModel) {
    const modalRef = this.modalService.open(ChangeDescriptionModalComponent);
    modalRef.componentInstance.permissionScheme = permissionScheme;
  }

  revertPermissionScheme(permissionScheme: PermissionSchemeModel) {
    const modalRef = this.modalService.open(RevertToDefaultModalComponent);
    modalRef.componentInstance.permissionScheme = permissionScheme;
  }
}
