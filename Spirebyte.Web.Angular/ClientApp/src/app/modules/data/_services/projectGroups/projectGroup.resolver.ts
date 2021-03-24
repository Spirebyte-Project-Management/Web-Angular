import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, first, map, switchMap} from 'rxjs/operators';
import { ProjectGroupEntityService } from './projectGroup-entity.service';

@Injectable()
export class ProjectGroupResolver implements Resolve<boolean> {

    constructor(private projectGroupEntityService: ProjectGroupEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.projectGroupEntityService.loaded$
            .pipe(
                switchMap(loaded => {
                    let projectId = route.paramMap.get('key');
                    if (!loaded || localStorage.getItem('loadedProjectGroups') != projectId) {

                        return this.projectGroupEntityService.getWithQuery({ 'projectId': projectId }).pipe(map(() => {
                            this.projectGroupEntityService.setLoaded(true);
                            localStorage.setItem('loadedProjectGroups', projectId);
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