import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { QueryParams } from '@ngrx/data';
import {Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import { ProjectEntityService } from '../projects/project-entity.service';
import { UserEntityService } from './user-entity.service';


@Injectable()
export class UsersResolver implements Resolve<boolean> {

    constructor(private userEntityService: UserEntityService,
        private projectEntityService: ProjectEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.userEntityService.loaded$
            .pipe(
                tap(loaded => {
                    let projectId = route.paramMap.get('key');
                    if (!loaded || localStorage.getItem('loadedProjectUsers') != projectId) {
                        let projectId = route.paramMap.get('key');
                        this.projectEntityService.entities$.pipe(map(projects => projects.find(project => project.id == projectId))).subscribe(project =>{
                            const ids = project.projectUserIds.concat(project.ownerUserId);
                            this.userEntityService.clearCache();
                            this.userEntityService.getWithQuery({'userIds': JSON.stringify(ids)});
                            this.userEntityService.setLoaded(true);
                            localStorage.setItem('loadedProjectUsers', projectId);
                        });
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}