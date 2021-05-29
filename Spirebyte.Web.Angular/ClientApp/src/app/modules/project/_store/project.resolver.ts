import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import * as ProjectActions from './project.actions';
import { hasProject } from './project.selectors';
import { ProjectState } from './project.state';

@Injectable()
export class ProjectResolver implements Resolve<boolean> {
  constructor(private store: Store<ProjectState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(hasProject, {id: route.params['key'] }),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(ProjectActions.getSingleProject({ projectId: route.params['key'] }));
        }
      }),
      filter(loaded => loaded),
      first(),
      tap(() => this.store.dispatch(ProjectActions.selectProject({ projectId: route.params['key'] })))
    );
  }
}
