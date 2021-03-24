import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { QueryParams } from '@ngrx/data';
import {Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import { SprintEntityService } from './sprint-entity.service';


@Injectable()
export class SprintsResolver implements Resolve<boolean> {

    constructor(private sprintEntityService: SprintEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.sprintEntityService.loaded$
            .pipe(
                tap(loaded => {
                    let projectId = route.paramMap.get('key');
                    if (!loaded || localStorage.getItem('loadedProjectSprints') != projectId) {
                        this.sprintEntityService.getWithQuery({'projectId': projectId});
                        this.sprintEntityService.setLoaded(true);
                        localStorage.setItem('loadedProjectSprints', projectId);
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}