import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IssueHistoryModel } from '../_models/issue-history.model';

const API_ISSUE_HISTORY_URL = `${environment.apiUrl}/issues/history`;

@Injectable()
export class IssueHistoryService {
  constructor(private http: HttpClient) { }

  getByIssueId(issueId: string): Observable<IssueHistoryModel[]> {
    return this.http.get<IssueHistoryModel[]>(`${API_ISSUE_HISTORY_URL}?issueId=${issueId}`);
  }

  getById(issueHistoryId: string): Observable<IssueHistoryModel> {
    return this.http.get<IssueHistoryModel>(`${API_ISSUE_HISTORY_URL}/${issueHistoryId}`);
  }
}
