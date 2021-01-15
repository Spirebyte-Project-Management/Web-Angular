import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { ProjectModel } from '../../../_models/project.model';
import { ProjectEntityService } from '../project-entity.service';

@Injectable()
export class InvitationGuard implements CanActivate {
    constructor(private authService: AuthService, private projectEntityService: ProjectEntityService, private router: Router, private activatedRoute: ActivatedRoute) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const projectId = next.paramMap.get('key');
        const userId = this.authService.currentUserValue.id;
        return this.projectEntityService.loading$.pipe(switchMap(loaded => {
            const test = loaded;
            if (!loaded) {
                return this.projectEntityService.getAll().pipe(map(projects => projects.find(p => p.id == projectId)));
            }
            else {
                return this.projectEntityService.entities$.pipe(map(projects => projects.find(p => p.id == projectId)));
            }
        }), filter(loaded => !!loaded), first()).pipe(map(project => this.checkIfUserIsPartOfProject(userId, project, state)));
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
        console.log('failed to guard')
        return false;
    }
}