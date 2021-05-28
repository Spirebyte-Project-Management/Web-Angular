
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { UserModel } from 'src/app/_models/user.model';

const API_USERS_URL = `${environment.apiUrl}/identity/users`;

@Injectable()
export class UserDataService implements EntityCollectionDataService<UserModel> {

    constructor(private http: HttpClient) {

    }
    name = 'User';

    add(entity: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${API_USERS_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        throw new Error('Method not implemented.');
    }
    getAll(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${API_USERS_URL}`);
    }
    getById(id: any): Observable<UserModel> {
        return this.http.get<UserModel>(`${API_USERS_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<UserModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<UserModel[]>(`${API_USERS_URL}/withids`, {params});
    }
    update(update: Update<UserModel>): Observable<UserModel> {
        return this.http.put<UserModel>(`${API_USERS_URL}/${update.id}`, update.changes);
    }
    upsert(entity: UserModel): Observable<UserModel> {
        throw new Error('Method not implemented.');
    }
}