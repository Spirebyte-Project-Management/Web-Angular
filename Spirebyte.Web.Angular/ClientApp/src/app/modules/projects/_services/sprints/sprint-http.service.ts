import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SprintModel } from '../../_models/sprint.model';

const API_SPRINTS_URL = `${environment.apiUrl}/Sprints`;

@Injectable({
  providedIn: 'root',
})
export class SprintHTTPService {
  constructor(private http: HttpClient) {}


  startSprint(sprintId: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintId}/start`, {id: sprintId});
  }

  endSprint(sprintId: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintId}/end`, {id: sprintId});
  }

  addIssueToSprint(sprintKey: string, issueKey: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintKey}/addIssue/${issueKey}`, {sprintKey, issueKey});
  }

  removeIssueFromSprint(sprintKey: string, issueKey: string){
    return this.http.post<SprintModel>(`${API_SPRINTS_URL}/${sprintKey}/removeIssue/${issueKey}`, {sprintKey, issueKey});
  }
}
