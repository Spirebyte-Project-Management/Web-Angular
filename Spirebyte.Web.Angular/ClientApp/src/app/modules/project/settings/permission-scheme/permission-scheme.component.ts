import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, GroupedObservable, Observable, of, Subscription, zip } from 'rxjs';
import { groupBy, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';
import { environment } from 'src/environments/environment';
import { ChangeDescriptionModalComponent } from './_components/change-description-modal/change-description-modal.component';
import { RemoveGrantModalComponent } from './_components/remove-grant-modal/remove-grant-modal.component';
import { RevertToDefaultModalComponent } from './_components/revert-to-default-modal/revert-to-default-modal.component';

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
    private projectGroupEntityService: ProjectGroupEntityService,
    private projectEntityService: ProjectEntityService,
    private permissionSchemeEntityService: PermissionSchemeEntityService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.subscriptions.push( 
      this.route.paramMap.subscribe(params => {
        let projectId = params.get('key');
        this.project$ = this.projectEntityService.entities$.pipe(
          map(projects => projects.find(project => project.id == projectId)),
          tap(project => this.permissionScheme$ = this.permissionSchemeEntityService.entities$.pipe(
            map(permissionScheme => permissionScheme.find(permissionScheme => permissionScheme.id == project.permissionSchemeId))
            ))
        );
        this.projectGroups$ = this.projectGroupEntityService.entities$.pipe(map(projectGroups => projectGroups.filter(projectGroup => projectGroup.projectId == projectId)));
      })
    );
  }

  groupPermissions(permissions: PermissionModel[]): Observable<GroupedObservable<string, PermissionModel>> {
    return from(permissions).pipe(groupBy(p => p.permissionGroup));
  }

  createCustomPermissionScheme(project: ProjectModel) {
    let customPermissionSchemeId = new PermissionSchemeModel();
    customPermissionSchemeId.projectId = project.id;
    this.permissionSchemeEntityService.add(customPermissionSchemeId).subscribe(permissionScheme => {
      this.projectEntityService.getByKey(project.id);
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
