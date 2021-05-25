
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { PermissionSchemeModel } from '../../_models/permission-scheme.model';

const API_PERMISSIONSCHEME_URL = `${environment.apiUrl}/permissionSchemes`;

@Injectable()
export class PermissionSchemeDataService implements EntityCollectionDataService<PermissionSchemeModel> {

    constructor(private http: HttpClient) {

    }
    name = 'PermissionScheme';

    add(entity: PermissionSchemeModel): Observable<PermissionSchemeModel> {
        return this.http.post<PermissionSchemeModel>(`${API_PERMISSIONSCHEME_URL}/${entity.projectId}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        return this.http.delete<string>(`${API_PERMISSIONSCHEME_URL}/${id}`);
    }
    getAll(): Observable<PermissionSchemeModel[]> {
        return this.http.get<PermissionSchemeModel[]>(`${API_PERMISSIONSCHEME_URL}`);
    }
    getById(id: any): Observable<PermissionSchemeModel> {
        return this.http.get<PermissionSchemeModel>(`${API_PERMISSIONSCHEME_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<PermissionSchemeModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<PermissionSchemeModel[]>(`${API_PERMISSIONSCHEME_URL}`, {params});
    }
    update(update: Update<PermissionSchemeModel>): Observable<PermissionSchemeModel> {
        return this.http.put<PermissionSchemeModel>(`${API_PERMISSIONSCHEME_URL}/${update.id}`, update.changes);
    }
    upsert(entity: PermissionSchemeModel): Observable<PermissionSchemeModel> {
        throw new Error('Method not implemented.');
    }
}