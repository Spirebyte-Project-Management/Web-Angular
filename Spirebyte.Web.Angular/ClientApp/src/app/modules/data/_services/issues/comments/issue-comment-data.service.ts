
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { IssueCommentModel } from '../../../_models/issue-comment.model';

const API_ISSUE_COMMENTS_URL = `${environment.apiUrl}/issues/comments`;

@Injectable()
export class IssueCommentDataService implements EntityCollectionDataService<IssueCommentModel> {

    constructor(private http: HttpClient) {

    }
    name = 'IssueComment';

    add(entity: IssueCommentModel): Observable<IssueCommentModel> {
        return this.http.post<IssueCommentModel>(`${API_ISSUE_COMMENTS_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        return this.http.delete<string>(`${API_ISSUE_COMMENTS_URL}/${id}`);
    }
    getAll(): Observable<IssueCommentModel[]> {
        return this.http.get<IssueCommentModel[]>(`${API_ISSUE_COMMENTS_URL}`);
    }
    getById(id: any): Observable<IssueCommentModel> {
        return this.http.get<IssueCommentModel>(`${API_ISSUE_COMMENTS_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<IssueCommentModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<IssueCommentModel[]>(`${API_ISSUE_COMMENTS_URL}`, {params});
    }
    update(update: Update<IssueCommentModel>): Observable<IssueCommentModel> {
        return this.http.put<IssueCommentModel>(`${API_ISSUE_COMMENTS_URL}/${update.id}`, update.changes);
    }
    upsert(entity: IssueCommentModel): Observable<IssueCommentModel> {
        throw new Error('Method not implemented.');
    }
}