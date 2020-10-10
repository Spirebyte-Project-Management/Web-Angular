import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateModel } from '../_models/update.model';
import { toFormData } from 'src/app/_helpers/to-form-data.helper';

const API_USERS_URL = `${environment.apiUrl}/identity`;

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {
  constructor(private http: HttpClient) {}

  // UPDATE =>  PUT: update user
  updateUser(user: UpdateModel): Observable<any> {
    return this.http.put<UpdateModel>(`${API_USERS_URL}/me`, toFormData(user));
  }
}
