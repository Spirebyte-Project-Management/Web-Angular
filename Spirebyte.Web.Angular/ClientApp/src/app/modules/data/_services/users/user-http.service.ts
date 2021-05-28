import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from 'src/app/_models/user.model';

const API_USERS_URL = `${environment.apiUrl}/identity/users`;

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {

  public baseUrl = API_USERS_URL;

  constructor(private http: HttpClient) {}

  // GET =>  GET: get issues for project
  getUsersWithIds(userIds: string[]): Observable<UserModel[]> {
    let params = new HttpParams();
    params = params.append(`userIds`, JSON.stringify(userIds)); 

    return this.http.get<UserModel[]>(`${API_USERS_URL}/withids`, {
        params
    });
  }

  searchUsers(searchTerm: string): Observable<UserModel[]> {
    let params = new HttpParams();
    params = params.append(`SearchTerm`, searchTerm);

    return this.http.get<UserModel[]>(`${API_USERS_URL}`, {
        params
    });
  }
}
