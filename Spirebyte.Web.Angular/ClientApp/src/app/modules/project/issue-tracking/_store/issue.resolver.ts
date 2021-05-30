import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import * as IssueActions from './issue.actions';
import { hasIssue } from './issue.selectors';
import { IssueState } from './issue.state';

@Injectable()
export class IssueResolver implements Resolve<boolean> {
  constructor(private store: Store<IssueState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(hasIssue, {id: route.params['key'] }),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(IssueActions.getSingleIssue({ issueId: route.params['key'] }));
        }
      }),
      filter(loaded => loaded),
      first(),
      tap(() => this.store.dispatch(IssueActions.selectIssue({ issueId: route.params['key'] })))
    );
  }
}
