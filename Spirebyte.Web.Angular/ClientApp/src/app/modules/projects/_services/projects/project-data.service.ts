
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../../_models/project.model';
import { environment } from '../../../../../environments/environment';
import { ProjectUpdateModel } from '../../_models/updateProject.model';
import { Update } from '@ngrx/entity';

const API_PROJECTS_URL = `${environment.apiUrl}/projects`;

@Injectable()
export class ProjectDataService implements EntityCollectionDataService<ProjectModel> {

    constructor(private http: HttpClient) {

    }
    name = 'Project';

    add(entity: ProjectModel): Observable<ProjectModel> {
        return this.http.post<ProjectModel>(`${API_PROJECTS_URL}`, entity);
    }
    delete(id: string | number): Observable<string | number> {
        throw new Error('Method not implemented.');
    }
    getAll(): Observable<ProjectModel[]> {
        return this.http.get<ProjectModel[]>(`${API_PROJECTS_URL}`);
    }
    getById(id: any): Observable<ProjectModel> {
        return this.http.get<ProjectModel>(`${API_PROJECTS_URL}/${id}`);
    }
    getWithQuery(params: string | QueryParams): Observable<ProjectModel[]> {
        throw new Error('Method not implemented.');
    }
    update(update: Update<ProjectModel>): Observable<ProjectModel> {
        return this.http.put<ProjectModel>(`${API_PROJECTS_URL}/${update.id}`, update.changes);
    }
    upsert(entity: ProjectModel): Observable<ProjectModel> {
        throw new Error('Method not implemented.');
    }
    
    // CHECK =>  GET: does key exist
    doesKeyExist(key: string): Observable<boolean> {
        return this.http.get<boolean>(`${API_PROJECTS_URL}/doeskeyexist/${key}`);
    }

    // JOIN =>  POST: create project
    joinProject(key: string, userId: string): Observable<ProjectModel> {
        return this.http.post<ProjectModel>(`${API_PROJECTS_URL}/${key}/join`, { userId });
    }

    // LEAVE =>  POST: create project
    leaveProject(key: string, userId: string): Observable<ProjectModel> {
        return this.http.post<ProjectModel>(`${API_PROJECTS_URL}/${key}/leave`, { userId });
    }

}