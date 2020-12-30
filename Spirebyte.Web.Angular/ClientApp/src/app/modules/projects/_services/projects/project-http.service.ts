import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectModel } from '../../_models/project.model';
import { ProjectUpdateModel } from '../../_models/updateProject.model';

const API_PROJECTS_URL = `${environment.apiUrl}/projects`;

@Injectable({
  providedIn: 'root',
})
export class ProjectHTTPService {
  constructor(private http: HttpClient) {}

  // CHECK =>  GET: does key exist
  exist(projectId: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_PROJECTS_URL}/exists/${projectId}`);
  }

  // JOIN =>  POST: create project
  joinProject(projectId: string, userId: string): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}/${projectId}/join`, { projectId, userId });
  }

  // LEAVE =>  POST: create project
  leaveProject(projectId: string, userId: string): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}/${projectId}/leave`, { projectId, userId });
  }
}
