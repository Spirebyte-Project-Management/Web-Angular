import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { map, catchError, tap, mergeMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { getRefreshToken } from './auth.selectors';
import { AppState } from '../app.state';

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStart),
      concatMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((auth) => {
            this.authService.setAuthInLocalStorage(auth);
            return AuthActions.loginSuccess({ auth });
          }),
          catchError((error: HttpErrorResponse) => of(AuthActions.loginFailure({ error: error.error }))),
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerStart),
      concatMap((action) => {
        return this.authService.createUser(action.registerModel).pipe(
          map(() => AuthActions.registerSuccess({ registerModel: action.registerModel })),
          catchError((error: HttpErrorResponse) => of(AuthActions.registerFailure({ error: error.error })))
        );
      })
    );
  });

  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.forgotPasswordStart),
      concatMap((action) => {
        return this.authService.forgotPassword(action.email).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error: HttpErrorResponse) => of(AuthActions.forgotPasswordFailure({ error: error.error })))
        );
      })
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.resetPasswordStart),
      concatMap((action) => {
        return this.authService.resetPassword(action.userId, action.token, action.password).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((error: HttpErrorResponse) => of(AuthActions.resetPasswordFailure({ error: error.error })))
        );
      })
    );
  });

  loginRegisteredUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      map((action) => {
        return AuthActions.loginStart({ email: action.registerModel.email, password: action.registerModel.password });
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[AuthActions.logout, AuthActions.autoLogout]),
        tap((action) => {
          this.authService.removeAuthFromLocalStorage();
          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[AuthActions.loginSuccess]),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  autoRefreshToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[AuthActions.autoRefreshToken]),
        mergeMap(() =>
          this.store.select(getRefreshToken)
        ),
        concatMap((refreshToken) => {
          return this.authService.refreshToken(refreshToken).pipe(
            map((auth) => {
              this.authService.setAuthInLocalStorage(auth);
              return AuthActions.autoRefreshTokenSuccess({ auth });
            }),
            catchError((error: HttpErrorResponse) => of(AuthActions.autoRefreshTokenFailure({ error: error.error }))),
          );
        })
      );
    }
  );

  autoLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoRefreshTokenFailure),
      map((action) => AuthActions.autoLogout())
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      concatMap((action) => {
        const auth = this.authService.getAuthFromLocalStorage();
        if (auth && auth.refreshToken) {
          return this.authService.refreshToken(auth.refreshToken).pipe(
            map((auth) => {
              this.authService.setAuthInLocalStorage(auth);
              return AuthActions.autoLoginSuccess({ auth });
            }),
            catchError((error: HttpErrorResponse) => of(AuthActions.autoRefreshTokenFailure({ error: error.error }))),
          );
        }
        return of(AuthActions.loginFailure({ error: null }));

      })
    );
  });


  ngrxOnInitEffects(): Action {
    return AuthActions.autoLogin();
  }
}
