import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectModel } from '../_models/project.model';

const API_PROJECTS_URL = `${environment.apiUrl}/projects`;

@Injectable({
  providedIn: 'root',
})
export class ProjectHTTPService {
  constructor(private http: HttpClient) {}

  // UPDATE =>  PUT: update user
  getOwnProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${API_PROJECTS_URL}`);
  }

  // CREATE =>  POST: create project
  createProject(project: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}`, project);
  }
}
