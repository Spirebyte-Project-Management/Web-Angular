import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectGroupModel } from '../_models/projectGroup.model';

const API_PROJECT_GROUPS_URL = `${environment.apiUrl}/projectGroups`;

@Injectable()
export class ProjectGroupService {
  constructor(private http: HttpClient) { }

  getByProjectId(projectId: string): Observable<ProjectGroupModel[]> {
    return this.http.get<ProjectGroupModel[]>(`${API_PROJECT_GROUPS_URL}?projectId=${projectId}`);
  }

  getById(projectGroupId: string): Observable<ProjectGroupModel> {
    return this.http.get<ProjectGroupModel>(`${API_PROJECT_GROUPS_URL}/${projectGroupId}`);
  }

  add(entity: ProjectGroupModel): Observable<ProjectGroupModel> {
    return this.http.post<ProjectGroupModel>(`${API_PROJECT_GROUPS_URL}`, entity);
  }
  delete(id: string | number): Observable<string | number> {
    return this.http.delete<string>(`${API_PROJECT_GROUPS_URL}/${id}`);
  }
  update(update: ProjectGroupModel): Observable<ProjectGroupModel> {
    return this.http.put<ProjectGroupModel>(`${API_PROJECT_GROUPS_URL}/${update.id}`, update);
  }
}
