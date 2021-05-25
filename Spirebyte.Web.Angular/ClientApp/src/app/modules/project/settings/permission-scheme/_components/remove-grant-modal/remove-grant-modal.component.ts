import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { GrantModel, GrantTypes } from 'src/app/modules/data/_models/grant.model';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';

@Component({
  selector: 'app-remove-grant-modal',
  templateUrl: './remove-grant-modal.component.html',
  styleUrls: ['./remove-grant-modal.component.scss']
})
export class RemoveGrantModalComponent implements OnInit {

  @Input() permissionScheme: PermissionSchemeModel;
  @Input() permission: PermissionModel;

  grantTypes = GrantTypes;

  currentGrants: GrantModel[];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private permissionSchemeEntityService: PermissionSchemeEntityService, private userEntityService: UserEntityService, private projectGroupEntityService: ProjectGroupEntityService) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    let permissionCopy = new PermissionModel();
    permissionCopy.setPermission(this.permission);
    this.currentGrants = permissionCopy.grants;
  }

  removeGrant(id: number){
    this.currentGrants.splice(id, 1);
  }

  removeGrantValue(id: number, arrayId: number) {
    let grantValue: string[] = JSON.parse(this.currentGrants[id].value);

    grantValue.splice(arrayId, 1);

    if(grantValue.length == 0){
      this.currentGrants.splice(id, 1);
      return;
    }

    this.currentGrants[id].value = JSON.stringify(grantValue);
  }

  getArray(value: string): string[]{
    return JSON.parse(value);
  }

  getProjectGroupById(projectGroupId: string): Observable<ProjectGroupModel> {
    return this.projectGroupEntityService.entities$.pipe(map(projectGroups => projectGroups.find(projectGroup => projectGroup.id == projectGroupId)));
  }
  
  getUserById(userId: string): Observable<UserModel> {
    return this.userEntityService.entities$.pipe(map(users => users.find(user => user.id == userId)));
  }

  getUsersByIds(userIds: string[]): Observable<UserModel[]> {
    return this.userEntityService.entities$.pipe(map(users => users.filter(user => userIds.includes(user.id))));
  }

  remove(){
    let updatedPermissionScheme = new PermissionSchemeModel();
    updatedPermissionScheme.setPermissionScheme(this.permissionScheme);

    const permissionIndex = updatedPermissionScheme.permissions.findIndex(perm => perm.key == this.permission.key);
    updatedPermissionScheme.permissions[permissionIndex].grants = this.currentGrants;

    this.permissionSchemeEntityService.update(updatedPermissionScheme);

    this.modal.close();
  }

}
