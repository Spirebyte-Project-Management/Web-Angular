import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IssueCommentModel } from '../_models/issue-comment.model';

const API_ISSUE_COMMENTS_URL = `${environment.apiUrl}/issues/comments`;

@Injectable()
export class IssueCommentService {
  constructor(private http: HttpClient) { }

  getByIssueId(issueId: string): Observable<IssueCommentModel[]> {
    return this.http.get<IssueCommentModel[]>(`${API_ISSUE_COMMENTS_URL}?issueId=${issueId}`);
  }

  getById(issueCommentId: string): Observable<IssueCommentModel> {
    return this.http.get<IssueCommentModel>(`${API_ISSUE_COMMENTS_URL}/${issueCommentId}`);
  }

  add(entity: IssueCommentModel): Observable<IssueCommentModel> {
    return this.http.post<IssueCommentModel>(`${API_ISSUE_COMMENTS_URL}`, entity);
  }
  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${API_ISSUE_COMMENTS_URL}/${id}`);
  }
  update(update: IssueCommentModel): Observable<IssueCommentModel> {
    return this.http.put<IssueCommentModel>(`${API_ISSUE_COMMENTS_URL}/${update.id}`, update);
  }
}
