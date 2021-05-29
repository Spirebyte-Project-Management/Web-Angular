import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import * as ProjectActions from './project.actions';
import { hasProjects } from './project.selectors';
import { ProjectState } from './project.state';

@Injectable()
export class ProjectsResolver implements Resolve<boolean> {
  constructor(private store: Store<ProjectState>) { }

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(hasProjects),
      tap(loaded => {
        this.store.dispatch(ProjectActions.getProjects());
      }),
      filter(loaded => loaded),
      first()
    );
  }
}