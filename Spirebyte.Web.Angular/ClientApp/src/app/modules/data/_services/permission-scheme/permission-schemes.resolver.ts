import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { PermissionSchemeEntityService } from './permission-scheme-entity.service';


@Injectable()
export class PermissionSchemeResolver implements Resolve<boolean> {

    constructor(private permissionSchemeEntityService: PermissionSchemeEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.permissionSchemeEntityService.loaded$
            .pipe(
                switchMap(loaded => {
                    let projectId = route.paramMap.get('key');
                    if (!loaded || localStorage.getItem('loadedProjectPermissionSchemes') != projectId) {

                        return this.permissionSchemeEntityService.getWithQuery({ 'projectId': projectId }).pipe(map(() => {
                            this.permissionSchemeEntityService.setLoaded(true);
                            localStorage.setItem('loadedProjectPermissionSchemes', projectId);
                            return true;
                        }));
                    }
                    else{
                        return of(true);
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}