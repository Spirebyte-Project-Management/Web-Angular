import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, catchError, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { AppState } from 'src/app/_store/app.state';
import { selectQueryParams } from 'src/app/_store/router/router.selectors';
import { IssueCommentService } from '../_services/issue-comments.services';
import { IssueHistoryService } from '../_services/issue-history.services';
import { IssueService } from '../_services/issue.services';
import * as IssueActions from './issue.actions';

@Injectable()
export class IssueEffects {
  constructor(
    private actions$: Actions,
    private issueService: IssueService,
    private issueCommentService: IssueCommentService,
    private issueHistoryService: IssueHistoryService,
    private userEntityService: UserEntityService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  setSelectedIssueOnQueryParamChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      withLatestFrom(this.store.select(selectQueryParams)),
      filter(([, issueId]) => issueId['selectedIssue'] !== undefined),
      map(([, { selectedIssue }]) => IssueActions.selectIssue({ issueId: selectedIssue }))
    );
  });

  getIssues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.getIssues),
      concatMap((action) => {
        return this.issueService.getAllByProject(action.projectId).pipe(
          map((issues) => IssueActions.getIssuesSuccess({ issues })),
          catchError((error: HttpErrorResponse) => of(IssueActions.getIssuesFailure({ error: error.error }))),
        );
      })
    );
  });

  

  getIssue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.getSingleIssue),
      concatMap((action) => {
        return this.issueService.getById(action.issueId).pipe(
          map((issue) => IssueActions.getSingleIssueSuccess({ issue })),
          catchError((error: HttpErrorResponse) => of(IssueActions.getSingleIssueFailure({ error: error.error }))),
        );
      })
    );
  });

  createIssue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.createIssue),
      concatMap((action) => {
        return this.issueService.add(action.issue).pipe(
          map((issue) => IssueActions.createIssueSuccess({ issue })),
          catchError((error: HttpErrorResponse) => of(IssueActions.createIssueFailure({ error: error.error }))),
        );
      })
    );
  });

  deleteIssue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.deleteIssue),
      concatMap((action) => {
        return this.issueService.delete(action.issueId).pipe(
          map((issue) => IssueActions.deleteIssueSuccess({ issueId: action.issueId })),
          catchError((error: HttpErrorResponse) => of(IssueActions.deleteIssueFailure({ error: error.error }))),
        );
      })
    );
  });

  updateIssue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.updateIssue),
      concatMap((action) => {
        return this.issueService.update(action.issue).pipe(
          map((issue) => IssueActions.updateIssueSuccess({ issue: action.issue })),
          catchError((error: HttpErrorResponse) => of(IssueActions.updateIssueFailure({ error: error.error }))),
        );
      })
    );
  });

  updatedIssueSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.updateIssueSuccess),
      switchMap((action) => {
        return [
          IssueActions.getSingleIssue({ issueId: action.issue.id })
        ]
      }),
    )
  });

  selectedIssue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.selectIssue),
      switchMap((action) => {
        return [
          IssueActions.loadIssueComments({ issueId: action.issueId }),
          IssueActions.loadIssueHistory({ issueId: action.issueId })
        ]
      })
    )
  });

  loadIssueHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.loadIssueHistory),
      concatMap((action) => {
        return this.issueHistoryService.getByIssueId(action.issueId).pipe(
          map((issueHistory) => IssueActions.loadIssueHistorySuccess({ issueHistory })),
          catchError((error: HttpErrorResponse) => of(IssueActions.loadIssueHistoryFailure({ error: error.error }))),
        );
      })
    );
  });

  loadIssueComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.loadIssueComments),
      concatMap((action) => {
        return this.issueCommentService.getByIssueId(action.issueId).pipe(
          map((issueComments) => IssueActions.loadIssueCommentsSuccess({ issueComments })),
          catchError((error: HttpErrorResponse) => of(IssueActions.loadIssueCommentsFailure({ error: error.error }))),
        );
      })
    );
  });

  addIssueComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.addIssueComment),
      concatMap((action) => {
        return this.issueCommentService.add(action.issueComment).pipe(
          map((issueComment) => {
            return IssueActions.addIssueCommentSuccess({ issueComment })
          }),
          catchError((error: HttpErrorResponse) => of(IssueActions.addIssueCommentFailure({ error: error.error }))),
        );
      })
    );
  });

  updateIssueComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.updateIssueComment),
      concatMap((action) => {
        return this.issueCommentService.update(action.issueComment).pipe(
          map((issueComment) => IssueActions.updateIssueCommentSuccess({ issueComment: action.issueComment, returnUrl: action.returnUrl })),
          catchError((error: HttpErrorResponse) => of(IssueActions.updateIssueCommentFailure({ error: error.error }))),
        );
      })
    );
  });

  deleteIssueComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.deleteIssueComment),
      concatMap((action) => {
        return this.issueCommentService.delete(action.issueCommentId).pipe(
          map((issueComment) => IssueActions.deleteIssueCommentSuccess({ issueCommentId: action.issueCommentId })),
          catchError((error: HttpErrorResponse) => of(IssueActions.deleteIssueCommentFailure({ error: error.error }))),
        );
      })
    );
  });

}
