
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { IssueHistoryModel } from '../../../_models/issue-history.model';

const API_ISSUE_HISTORY_URL = `${environment.apiUrl}/issues/history`;

@Injectable()
export class IssueHistoryDataService implements EntityCollectionDataService<IssueHistoryModel> {

    constructor(private http: HttpClient) {

    }
    name = 'IssueHistory';

    add(entity: IssueHistoryModel): Observable<IssueHistoryModel> {
        throw new Error('Method not implemented.');
    }
    delete(id: string | number): Observable<string | number> {
        throw new Error('Method not implemented.');
    }
    getAll(): Observable<IssueHistoryModel[]> {
        return this.http.get<IssueHistoryModel[]>(`${API_ISSUE_HISTORY_URL}`);
    }
    getById(id: any): Observable<IssueHistoryModel> {
        throw new Error('Method not implemented.');
    }
    getWithQuery(queryParams: string | QueryParams): Observable<IssueHistoryModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<IssueHistoryModel[]>(`${API_ISSUE_HISTORY_URL}`, {params});
    }
    update(update: Update<IssueHistoryModel>): Observable<IssueHistoryModel> {
        throw new Error('Method not implemented.');
    }
    upsert(entity: IssueHistoryModel): Observable<IssueHistoryModel> {
        throw new Error('Method not implemented.');
    }
}