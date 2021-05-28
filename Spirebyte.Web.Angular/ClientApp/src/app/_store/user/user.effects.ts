import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as AuthActions from '../auth/auth.actions';
import { map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/_services/user.service';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) { }

 
  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateProfile),
      concatMap((action) => {
        return this.userService.updateProfile(action.profile).pipe(
          map(() => {
            return UserActions.updateProfileSuccess({ profile: action.profile })
          }),
          catchError((error: HttpErrorResponse) => of(UserActions.updateProfileFailure({ error: error.error })))
        );
      })
    );
  });

  getUserData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[AuthActions.loginSuccess, AuthActions.autoLoginSuccess]),
        concatMap((action) => {
          return this.userService.getUserByToken(action.auth.accessToken).pipe(
            map((user) => {
              user.accessToken = action.auth.accessToken;
              user.refreshToken = action.auth.refreshToken;
              user.expires = action.auth.expires;
              return UserActions.getUserDataSuccess({ user });
            }),
            catchError((error: HttpErrorResponse) => of(UserActions.getUserDataFailure({ error: error.error }))),
          );
        })
      );
    }
  );
}
