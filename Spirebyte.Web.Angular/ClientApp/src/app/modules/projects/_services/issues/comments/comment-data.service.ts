
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Update } from '@ngrx/entity';
import { CommentModel } from '../../../_models/comment.model';

const API_ISSUE_COMMENTS_URL = `${environment.apiUrl}/issues/comments`;

@Injectable()
export class CommentDataService implements EntityCollectionDataService<CommentModel> {

    constructor(private http: HttpClient) {

    }
    name = 'Comment';

    add(entity: CommentModel): Observable<CommentModel> {
        return this.http.post<CommentModel>(`${API_ISSUE_COMMENTS_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        return this.http.delete<string>(`${API_ISSUE_COMMENTS_URL}/${id}`);
    }
    getAll(): Observable<CommentModel[]> {
        return this.http.get<CommentModel[]>(`${API_ISSUE_COMMENTS_URL}`);
    }
    getById(id: any): Observable<CommentModel> {
        return this.http.get<CommentModel>(`${API_ISSUE_COMMENTS_URL}/${id}`);
    }
    getWithQuery(queryParams: string | QueryParams): Observable<CommentModel[]> {
        const qParams =
        typeof queryParams === 'string'
          ? { fromString: queryParams }
          : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        return this.http.get<CommentModel[]>(`${API_ISSUE_COMMENTS_URL}`, {params});
    }
    update(update: Update<CommentModel>): Observable<CommentModel> {
        return this.http.put<CommentModel>(`${API_ISSUE_COMMENTS_URL}/${update.id}`, update.changes);
    }
    upsert(entity: CommentModel): Observable<CommentModel> {
        throw new Error('Method not implemented.');
    }
}