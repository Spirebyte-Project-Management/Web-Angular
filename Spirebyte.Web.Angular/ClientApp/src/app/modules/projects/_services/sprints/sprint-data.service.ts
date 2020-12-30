
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { SprintModel } from '../../_models/sprint.model';

const API_SPRINTS_URL = `${environment.apiUrl}/Sprints`;

@Injectable()
export class SprintDataService implements EntityCollectionDataService<SprintModel> {

    constructor(private http: HttpClient) {

    }
    name = 'Issue';

    add(entity: SprintModel): Observable<SprintModel> {
        return this.http.post<SprintModel>(`${API_SPRINTS_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        throw new Error('Method not implemented.');
    }
    getAll(): Observable<SprintModel[]> {
        return this.http.get<SprintModel[]>(`${API_SPRINTS_URL}`);
    }
    getById(id: any): Observable<SprintModel> {
        return this.http.get<SprintModel>(`${API_SPRINTS_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<SprintModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<SprintModel[]>(`${API_SPRINTS_URL}`, {params});
    }
    update(update: Update<SprintModel>): Observable<SprintModel> {
        return this.http.put<SprintModel>(`${API_SPRINTS_URL}/${update.id}`, update.changes);
    }
    upsert(entity: SprintModel): Observable<SprintModel> {
        throw new Error('Method not implemented.');
    }
}