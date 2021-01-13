import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { IssueEntityService } from './issue-entity.service';


@Injectable()
export class IssuesResolver implements Resolve<boolean> {

    constructor(private issueEntityService: IssueEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.issueEntityService.loaded$
            .pipe(
                switchMap(loaded => {
                    let projectId = route.paramMap.get('key');
                    if (!loaded || localStorage.getItem('loadedProjectIssues') != projectId) {

                        return this.issueEntityService.getWithQuery({ 'projectId': projectId }).pipe(map(() => {
                            this.issueEntityService.setLoaded(true);
                            localStorage.setItem('loadedProjectIssues', projectId);
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