
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { IssueModel } from '../../_models/issue.model';

const API_ISSUES_URL = `${environment.apiUrl}/issues`;

@Injectable()
export class IssueDataService implements EntityCollectionDataService<IssueModel> {

    constructor(private http: HttpClient) {

    }
    name = 'Issue';

    add(entity: IssueModel): Observable<IssueModel> {
        return this.http.post<IssueModel>(`${API_ISSUES_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        return this.http.delete<string>(`${API_ISSUES_URL}/${id}`);
    }
    getAll(): Observable<IssueModel[]> {
        return this.http.get<IssueModel[]>(`${API_ISSUES_URL}`);
    }
    getById(id: any): Observable<IssueModel> {
        return this.http.get<IssueModel>(`${API_ISSUES_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<IssueModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<IssueModel[]>(`${API_ISSUES_URL}`, {params});
    }
    update(update: Update<IssueModel>): Observable<IssueModel> {
        return this.http.put<IssueModel>(`${API_ISSUES_URL}/${update.id}`, update.changes);
    }
    upsert(entity: IssueModel): Observable<IssueModel> {
        throw new Error('Method not implemented.');
    }
}