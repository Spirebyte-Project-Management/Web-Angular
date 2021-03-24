import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { QueryParams } from '@ngrx/data';
import {Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import { SprintEntityService } from './sprint-entity.service';


@Injectable()
export class SprintResolver implements Resolve<boolean> {

    constructor(private sprintEntityService: SprintEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.sprintEntityService.loaded$
            .pipe(
                tap(loaded => {
                    let projectId = route.paramMap.get('key');
                    let sprintId = route.paramMap.get('sprintKey');
                    if (!loaded || localStorage.getItem('loadedProjectSprint') != sprintId) {
                        this.sprintEntityService.getByKey(sprintId);
                        localStorage.setItem('loadedProjectSprint', sprintId);
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}