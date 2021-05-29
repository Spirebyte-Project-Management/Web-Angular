import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrantTypes } from 'src/app/modules/data/_models/grant.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';
import { Store } from '@ngrx/store';
import { getSelectedProject, getSelectedProjectGroups } from 'src/app/modules/project/_store/project.selectors';
import { ProjectModel } from 'src/app/modules/project/_models/project.model';

@Injectable()
export class PermissionService {

    constructor(private store: Store, private permissionSchemeEntityService: PermissionSchemeEntityService) {}

    getAllowanceByKeys(permissionKey: string | string[], projectId: string, userId: string): Observable<boolean> {
        let permissionKeys: string[] = [];
        permissionKeys = permissionKeys.concat(permissionKey);

        let projectGroups = this.store.select(getSelectedProjectGroups);
        let permissionSchemes = this.permissionSchemeEntityService.entities$;
        let project = this.store.select(getSelectedProject);
        return combineLatest([project, projectGroups, permissionSchemes]).pipe(
            map(([project, projectGroups, permissionSchemes]) => {
                let result = false;

                const permissionScheme = permissionSchemes.find(permSchem => permSchem.id == project.permissionSchemeId);

                for (const permissionKey of permissionKeys){
                    const permission = permissionScheme.permissions.find(perm => perm.key == permissionKey);
                    result = this.hasPermission(permission, project, userId, projectGroups);
                }

                return result;
            })
        );
    }

    hasAPermissionByKeys(permissionKey: string | string[], projectId: string, userId: string): Observable<boolean> {
        let permissionKeys: string[] = [];
        permissionKeys = permissionKeys.concat(permissionKey);

        let projectGroups = this.store.select(getSelectedProjectGroups);
        let permissionSchemes = this.permissionSchemeEntityService.entities$;
        let project = this.store.select(getSelectedProject);

        return combineLatest([project, projectGroups, permissionSchemes]).pipe(
            map(([project, projectGroups, permissionSchemes]) => {
                const permissionScheme = permissionSchemes.find(permSchem => permSchem.id == project.permissionSchemeId);

                for (const permissionKey of permissionKeys){
                    const permission = permissionScheme.permissions.find(perm => perm.key == permissionKey);
                    if(this.hasPermission(permission, project, userId, projectGroups)){
                        return true
                    }
                }

                return false;
            })
        );
    }



    hasPermission(permission: PermissionModel, project: ProjectModel, userId: string, projectGroups: ProjectGroupModel[]): boolean {
        for (const permissionGrant of permission.grants) {
            switch (permissionGrant.type) {
                case GrantTypes.Anyone:
                    return true;
                    break;
                case GrantTypes.ProjectGroup:
                    // Is user part of project group
                    const groupIds: string[] = JSON.parse(permissionGrant.value);

                    for (var groupId of groupIds) {

                        var group = projectGroups.find(pg => pg.id == groupId);
                        if (group.userIds.includes(userId)) {
                            return true;
                        }
                    }
                    break;
                case GrantTypes.ProjectLead:
                    // If user is project leader
                    if (project.ownerUserId == userId) {
                        return true;
                    }
                    break;
                case GrantTypes.ProjectUser:
                    if (permissionGrant.value.length == 0) {
                        // Is project owner
                        if (project.ownerUserId == userId) {
                            return true;
                        }

                        // Is project user
                        if (project.projectUserIds.includes(userId)) {
                            return true;
                        }

                        continue;
                    }

                    var userIds: string[] = JSON.parse(permissionGrant.value);

                    // Is specifically allowed
                    if (userIds.includes(userId)) {
                        return true;
                    }
                    break;
            }
        }
        return false;
    }
}