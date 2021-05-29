import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ProjectModel } from '../_models/project.model';

export const ProjectFeatureKey = 'projects';

export interface ProjectState extends EntityState<ProjectModel> {
    error: any;
    currentProjectId: string;
}

export const ProjectAdapter = createEntityAdapter<ProjectModel>();


export const initialState: ProjectState = ProjectAdapter.getInitialState({
    error: null,
    currentProjectId: null
});