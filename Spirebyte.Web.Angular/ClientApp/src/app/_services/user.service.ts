import { Observable } from 'rxjs';
import { AuthModel } from '../_models/auth.model';
import { UserModel } from '../_models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModel } from '../_models/updateProfile.model';


const API_USERS_URL = `${environment.apiUrl}/identity`;

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient, private store: Store) {}

    updateProfile(profile: ProfileModel): Observable<any> {
      return this.http.put<ProfileModel>(`${API_USERS_URL}/profile`, profile);
    }
  
    getUserByToken(token): Observable<UserModel> {
      const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<UserModel>(`${API_USERS_URL}/profile`, {
        headers: httpHeaders,
      });
    }
}
