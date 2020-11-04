import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectModel } from '../_models/project.model';
import { ProjectUpdateModel } from '../_models/updateProject.model';

const API_PROJECTS_URL = `${environment.apiUrl}/projects`;

@Injectable({
  providedIn: 'root',
})
export class ProjectHTTPService {
  constructor(private http: HttpClient) {}

  // GET =>  GET: get projects
  getOwnProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${API_PROJECTS_URL}`);
  }

  // GET =>  GET: get project
  getProject(key: string): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(`${API_PROJECTS_URL}/${key}`);
  }

  // CREATE =>  POST: create project
  createProject(project: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}`, project);
  }

  // UPDATE =>  PUT: update user
  updateProject(project: ProjectUpdateModel, key:string): Observable<any> {
    return this.http.put<ProjectUpdateModel>(`${API_PROJECTS_URL}/${key}`, project);
  }

  // CHECK =>  GET: does key exist
  doesKeyExist(key: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_PROJECTS_URL}/doeskeyexist/${key}`);
  }
}
