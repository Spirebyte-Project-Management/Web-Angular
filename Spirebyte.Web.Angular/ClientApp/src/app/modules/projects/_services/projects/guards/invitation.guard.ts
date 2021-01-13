import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { ProjectEntityService } from '../project-entity.service';

@Injectable()
  export class InvitationGuard implements CanActivate {
    constructor(private authService: AuthService, private projectEntityService: ProjectEntityService, private router: Router, private activatedRoute: ActivatedRoute) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const projectId = next.paramMap.get('key');
        const userId = this.authService.currentUserValue.id;
        return this.projectEntityService.loaded$.pipe(tap(loaded => {
            if (!loaded) {
                this.projectEntityService.getAll();
            }
                this.projectEntityService.entities$.pipe(map(projects => projects.find(p => p.id == projectId))).pipe(map(project => {

                    if(project == null) {
                        this.router.navigate(['/']);
                        return false;
                    }
        
                    if(project.ownerUserId == userId || project.projectUserIds.includes(userId)){
                        return true
                    }
                    else if(project.invitedUserIds.includes(userId)) {
                        if (state.url.includes('invitation/' + userId)) {
                            return true;
                        }
                        else{
                            this.router.navigate(['projects', projectId, 'invitation', userId]);
                            return false;
                        }
                    }
                    console.log('failed to guard')
                    return false;
                }))
            }),
            filter(loaded => loaded),
            first()
        );
        
    }
  }