import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, filter, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';
import { ProjectModel } from '../_models/project.model';
import { getSelectedProject, hasSelectedProject } from './project.selectors';

@Injectable()
export class InvitationResolver implements Resolve<boolean> {
    constructor(private store: Store, private router: Router) { }

    resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(hasSelectedProject).pipe(
            filter(selected => selected),
            first(),
            concatMap(() => 
                this.store.select(getSelectedProject).pipe(
                    first(),
                    mergeMap(project => this.store.select(getAuthenticatedUserId).pipe(
                        first(),
                        map(userId => this.checkIfUserIsPartOfProject(userId as string, project as ProjectModel, state)))
                    ),
                )
            )
        );
    }

    checkIfUserIsPartOfProject(userId: string, project: ProjectModel, routerState: RouterStateSnapshot): boolean {
        if (project == null) {
            this.router.navigate(['/']);

            return false;
        }

        if (project.ownerUserId == userId || project.projectUserIds.includes(userId)) {
            return true
        }
        else if (project.invitedUserIds.includes(userId)) {
            if (routerState.url.includes('invitation/' + userId)) {
                return true;
            }
            else {
                this.router.navigate(['projects', project.id, 'invitation', userId]);

                return false;
            }
        }
        this.router.navigate(['/']);
        return false;
    }
}
