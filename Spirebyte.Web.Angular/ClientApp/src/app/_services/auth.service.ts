import { Observable } from 'rxjs';
import { AuthModel } from '../_models/auth.model';
import { UserModel } from '../_models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../_store/auth/auth.actions';
import { RegisterModel } from '../_models/register.model';


const API_USERS_URL = `${environment.apiUrl}/identity`;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    timeoutInterval: any;

    constructor(private http: HttpClient, private store: Store) {}

    // POST =>  POST: add a new user to the server
    refreshToken(refreshToken: string): Observable<any> {
      return this.http.post<AuthModel>(`${API_USERS_URL}/refresh-tokens/use`, { refreshToken });
    }

    // public methods
    login(email: string, password: string): Observable<any> {
      return this.http.post<AuthModel>(`${API_USERS_URL}/sign-in`, { email, password });
    }
  
    // CREATE =>  POST: add a new user to the server
    createUser(registerModel: RegisterModel): Observable<UserModel> {
      return this.http.post<UserModel>(`${API_USERS_URL}/sign-up`, registerModel);
    }
  
    // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
    forgotPassword(email: string): Observable<boolean> {
      return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
        email,
      });
    }
  
    // Server should check token for user id and if true change password
    resetPassword(userId: string, token: string, password: string): Observable<boolean> {
      return this.http.post<boolean>(`${API_USERS_URL}/reset-password`, {
        userId,
        token,
        password
      });
    }

    removeAuthFromLocalStorage() {
      localStorage.removeItem(this.authLocalStorageToken);
    }

    setAuthInLocalStorage(auth: AuthModel): boolean {
      // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
      if (auth && auth.accessToken) {
        localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
        this.runTimeoutInterval(auth);
        return true;
      }
      return false;
    }
  
    getAuthFromLocalStorage(): AuthModel {
      try {
        const authData = JSON.parse(
          localStorage.getItem(this.authLocalStorageToken)
        );
        if(authData && authData.refreshToken){
          this.runTimeoutInterval(authData);
        }
        return authData;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }

    private runTimeoutInterval(auth: AuthModel) {
      const todaysDate = new Date().getTime();
      const expirationDate = new Date(auth.expires * 1000).getTime();
      const timeInterval = expirationDate - todaysDate;

      this.timeoutInterval = setTimeout(() => {
        this.store.dispatch(AuthActions.autoRefreshToken());
      }, timeInterval);
    }
}
