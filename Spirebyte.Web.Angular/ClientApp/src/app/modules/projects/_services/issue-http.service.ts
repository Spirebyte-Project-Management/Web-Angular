import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IssueModel } from '../_models/issue.model';
import { HttpParams } from '@angular/common/http';

const API_ISSUES_URL = `${environment.apiUrl}/issues`;

@Injectable({
  providedIn: 'root',
})
export class IssueHTTPService {
  constructor(private http: HttpClient) {}

  // GET =>  GET: get issues for project
  getIssuesForProject(projectKey: string): Observable<IssueModel[]> {
    return this.http.get<IssueModel[]>(`${API_ISSUES_URL}/forProject/${projectKey}`);
  }

  // GET =>  GET: get issues for project
  getBacklogForProject(projectKey: string): Observable<IssueModel[]> {
    return this.http.get<IssueModel[]>(`${API_ISSUES_URL}/backlogForProject/${projectKey}`);
  }

  // GET =>  GET: get project
  getIssue(issueKey: string): Observable<IssueModel> {
    return this.http.get<IssueModel>(`${API_ISSUES_URL}/${issueKey}`);
  }

  // CREATE =>  POST: create issue
  createIssue(issue: IssueModel, projectId: string): Observable<IssueModel> {
    return this.http.post<IssueModel>(`${API_ISSUES_URL}/${projectId}`, issue);
  }

  // UPDATE =>  PUT: update issue
  updateIssue(issue: IssueModel, issueKey: string): Observable<IssueModel> {
    return this.http.put<IssueModel>(`${API_ISSUES_URL}/${issueKey}`, issue);
  }

  // DELETE =>  DELETE: delete issue
  deleteIssue(issueKey: string): Observable<IssueModel> {
    return this.http.delete<IssueModel>(`${API_ISSUES_URL}/${issueKey}`);
  }

  // GET =>  GET: get issues for project
  getIssuesWithIds(issueIds: string[]): Observable<IssueModel[]> {
    let params = new HttpParams();
    params = params.append(`issueIds`, JSON.stringify(issueIds));

    return this.http.get<IssueModel[]>(`${API_ISSUES_URL}/withIds`, {
        params
    });
  }
}
