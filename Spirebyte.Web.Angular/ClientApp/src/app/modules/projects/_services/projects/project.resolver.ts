import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import { ProjectEntityService } from './project-entity.service';


@Injectable()
export class ProjectResolver implements Resolve<boolean> {

    constructor(private projectEntityService: ProjectEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.projectEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                       this.projectEntityService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}