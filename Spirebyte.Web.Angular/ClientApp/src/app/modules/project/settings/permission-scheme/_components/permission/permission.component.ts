import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { GrantModel, GrantTypes } from 'src/app/modules/data/_models/grant.model';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { AddGrantModalComponent } from '../add-grant-modal/add-grant-modal.component';
import { RemoveGrantModalComponent } from '../remove-grant-modal/remove-grant-modal.component';

@Component({
  selector: 'tr[app-permission]',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  @Input() permissionScheme: PermissionSchemeModel;
  @Input() permission: PermissionModel;
  @Input() canEdit: boolean = false;

  grantTypes = GrantTypes;

  constructor(private modalService: NgbModal, private userEntityService: UserEntityService, private projectGroupEntityService: ProjectGroupEntityService) { }

  ngOnInit(): void {
  }

  getUsersByValue(value: string): Observable<UserModel[]> {
    const userIds: string[] = JSON.parse(value);
    return this.userEntityService.entities$.pipe(map(users => users.filter(user => userIds.includes(user.id))));
  }

  projectRoles(): GrantModel[] {
    return this.permission.grants.filter(grant => grant.type == GrantTypes.ProjectUser || grant.type == GrantTypes.ProjectLead)
  }

  otherGrants(): GrantModel[] {
    return this.permission.grants.filter(grant => grant.type == GrantTypes.Anyone || grant.type == GrantTypes.ProjectGroup)
  }

  addGrant() {
    const modalRef = this.modalService.open(AddGrantModalComponent);
    modalRef.componentInstance.permission = this.permission;
    modalRef.componentInstance.permissionScheme = this.permissionScheme;
  }

  removeGrant() {
    const modalRef = this.modalService.open(RemoveGrantModalComponent);
    modalRef.componentInstance.permission = this.permission;
    modalRef.componentInstance.permissionScheme = this.permissionScheme;
  }


  getProjectGroupsByJson(value: string): Observable<ProjectGroupModel[]> {
    let projectGroupIds: string[] = JSON.parse(value);
    return this.projectGroupEntityService.entities$.pipe(map(projectGroups => projectGroups.filter(projectGroup => projectGroupIds.includes(projectGroup.id))));
  }
  
  getUsersByIds(userIds: string[]): Observable<UserModel[]> {
    return this.userEntityService.entities$.pipe(map(users => users.filter(user => userIds.includes(user.id))));
  }
}
