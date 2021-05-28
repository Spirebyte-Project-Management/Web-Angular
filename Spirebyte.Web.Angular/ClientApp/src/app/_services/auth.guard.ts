import { filter, first, map, mergeMap, skipWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AppState } from '../_store/app.state';
import { isAuthenticated, isAuthLoading } from '../_store/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(isAuthLoading).pipe(
      filter(loading => !loading),
      mergeMap(() => this.store.select(isAuthenticated)),
      map((authenticate) => {
        if (!authenticate) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      }),
      first()
    );
  }
}
