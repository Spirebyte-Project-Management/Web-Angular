import { UserModel } from '../../auth/_models/user.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const API_USERS_URL = `${environment.apiUrl}/identity/users`;

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {
  constructor(private http: HttpClient) {}

  // GET =>  GET: get issues for project
  getUsersWithIds(userIds: string[]): Observable<UserModel[]> {
    let params = new HttpParams();
    params = params.append(`userIds`, JSON.stringify(userIds)); 

    return this.http.get<UserModel[]>(`${API_USERS_URL}/withids`, {
        params
    });
  }
}
