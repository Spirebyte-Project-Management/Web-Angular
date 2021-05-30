import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IssueModel } from '../_models/issue.model';
import { IssueUpdateModel } from '../_models/issue-update.model';

const API_ISSUES_URL = `${environment.apiUrl}/issues`;

@Injectable()
export class IssueService {
  constructor(private http: HttpClient) { }


  add(entity: IssueModel): Observable<IssueModel> {
    return this.http.post<IssueModel>(`${API_ISSUES_URL}`, entity);
  }
  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${API_ISSUES_URL}/${id}`);
  }
  getAllByProject(projectId: string): Observable<IssueModel[]> {
    return this.http.get<IssueModel[]>(`${API_ISSUES_URL}/?projectId=${projectId}`);
  }
  getById(id: string): Observable<IssueModel> {
    return this.http.get<IssueModel>(`${API_ISSUES_URL}/${id}`);
  }
  update(update: IssueUpdateModel): Observable<IssueModel> {
    return this.http.put<IssueModel>(`${API_ISSUES_URL}/${update.id}`, update);
  }
}
