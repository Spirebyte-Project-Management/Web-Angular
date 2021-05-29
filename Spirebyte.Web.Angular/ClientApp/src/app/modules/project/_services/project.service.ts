import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectUpdateModel } from '../_models/updateProject.model';
import { ProjectModel } from '../_models/project.model';

const API_PROJECTS_URL = `${environment.apiUrl}/projects`;

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) { }


  add(entity: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}`, entity);
  }
  delete(id: string | number): Observable<string | number> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${API_PROJECTS_URL}`);
  }
  getById(id: string): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(`${API_PROJECTS_URL}/${id}`);
  }
  update(update: ProjectUpdateModel): Observable<ProjectModel> {
    return this.http.put<ProjectModel>(`${API_PROJECTS_URL}/${update.id}`, update);
  }

  exist(projectId: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_PROJECTS_URL}/exists/${projectId}`);
  }

  // JOIN =>  POST: create project
  joinProject(key: string, userId: string): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}/${key}/join`, { userId, projectId: key });
  }

  // LEAVE =>  POST: create project
  leaveProject(key: string, userId: string): Observable<ProjectModel> {
    return this.http.post<ProjectModel>(`${API_PROJECTS_URL}/${key}/leave`, { userId, projectId: key });
  }
}
