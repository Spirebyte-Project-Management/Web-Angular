import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import * as IssueActions from './issue.actions';
import { hasIssues, projectHasIssues } from './issue.selectors';
import { IssueState } from './issue.state';

@Injectable()
export class IssuesResolver implements Resolve<boolean> {
  constructor(private store: Store<IssueState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(projectHasIssues),
      tap(loaded => {
        if (!loaded){
          this.store.dispatch(IssueActions.getIssues({ projectId: route.params['key'] }));
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}