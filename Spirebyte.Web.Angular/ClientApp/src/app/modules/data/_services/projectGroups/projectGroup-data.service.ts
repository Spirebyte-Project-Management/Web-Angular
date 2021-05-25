
import { Injectable } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { ProjectGroupModel } from '../../_models/projectGroup.model';

const API_PROJECT_GROUPS_URL = `${environment.apiUrl}/projectGroups`;

@Injectable()
export class ProjectGroupDataService implements EntityCollectionDataService<ProjectGroupModel> {

    constructor(private http: HttpClient) {

    }
    name = 'ProjectGroup';

    add(entity: ProjectGroupModel): Observable<ProjectGroupModel> {
        return this.http.post<ProjectGroupModel>(`${API_PROJECT_GROUPS_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        return this.http.delete<string>(`${API_PROJECT_GROUPS_URL}/${id}`);
    }
    getAll(): Observable<ProjectGroupModel[]> {
        return this.http.get<ProjectGroupModel[]>(`${API_PROJECT_GROUPS_URL}`);
    }
    getById(id: any): Observable<ProjectGroupModel> {
        return this.http.get<ProjectGroupModel>(`${API_PROJECT_GROUPS_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<ProjectGroupModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<ProjectGroupModel[]>(`${API_PROJECT_GROUPS_URL}`, {params});
    }
    update(update: Update<ProjectGroupModel>): Observable<ProjectGroupModel> {
        return this.http.put<ProjectGroupModel>(`${API_PROJECT_GROUPS_URL}/${update.id}`, update.changes);
    }
    upsert(entity: ProjectGroupModel): Observable<ProjectGroupModel> {
        throw new Error('Method not implemented.');
    }
}