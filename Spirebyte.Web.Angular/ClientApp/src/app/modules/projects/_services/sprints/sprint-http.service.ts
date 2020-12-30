import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SprintModel } from '../../_models/Sprint.model';

const API_SPRINTS_URL = `${environment.apiUrl}/Sprints`;

@Injectable({
  providedIn: 'root',
})
export class SprintHTTPService {
  constructor(private http: HttpClient) {}

  // GET =>  GET: get Sprints for project
  getSprintsForProject(projectKey: string): Observable<SprintModel[]> {
    return this.http.get<SprintModel[]>(`${API_SPRINTS_URL}/forProject/${projectKey}`);
  }

  // GET =>  GET: get project
  getSprint(SprintKey: string): Observable<SprintModel> {
    return this.http.get<SprintModel>(`${API_SPRINTS_URL}/${SprintKey}`);
  }

  // CREATE =>  POST: create Sprint
  createSprint(Sprint: SprintModel, projectId: string): Observable<SprintModel> {
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${projectId}`, Sprint);
  }

  addIssueToSprint(sprintKey: string, issueKey: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintKey}/addIssue/${issueKey}`, {sprintKey, issueKey});
  }

  removeIssueFromSprint(sprintKey: string, issueKey: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintKey}/removeIssue/${issueKey}`, {sprintKey, issueKey});
  }
}
