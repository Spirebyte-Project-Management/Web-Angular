import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { QueryParams } from '@ngrx/data';
import {Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import { IssueEntityService } from './issue-entity.service';


@Injectable()
export class IssuesResolver implements Resolve<boolean> {

    constructor(private issueEntityService: IssueEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.issueEntityService.loaded$
            .pipe(
                tap(loaded => {
                    let projectId = route.paramMap.get('key');
                    if (!loaded || localStorage.getItem('loadedProjectIssues') != projectId) {
                        this.issueEntityService.getWithQuery({'projectId': projectId});
                        this.issueEntityService.setLoaded(true);
                        localStorage.setItem('loadedProjectIssues', projectId);
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}