import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IssueModel } from '../_models/issue.model';

const API_ISSUES_URL = `${environment.apiUrl}/issues`;

@Injectable({
  providedIn: 'root',
})
export class IssueHTTPService {
  constructor(private http: HttpClient) {}

  // GET =>  GET: get issues for project
  getIssuesForProject(projectId: string): Observable<IssueModel[]> {
    return this.http.get<IssueModel[]>(`${API_ISSUES_URL}/${projectId}`);
  }

  // GET =>  GET: get project
  getIssue(issueId: string): Observable<IssueModel> {
    return this.http.get<IssueModel>(`${API_ISSUES_URL}/${issueId}`);
  }

  // CREATE =>  POST: create issue
  createIssue(issue: IssueModel, projectId: string): Observable<IssueModel> {
    return this.http.post<IssueModel>(`${API_ISSUES_URL}/${projectId}`, issue);
  }
}
