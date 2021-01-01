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


  startSprint(sprintId: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintId}/start`, {id: sprintId});
  }

  addIssueToSprint(sprintKey: string, issueKey: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintKey}/addIssue/${issueKey}`, {sprintKey, issueKey});
  }

  removeIssueFromSprint(sprintKey: string, issueKey: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintKey}/removeIssue/${issueKey}`, {sprintKey, issueKey});
  }
}
