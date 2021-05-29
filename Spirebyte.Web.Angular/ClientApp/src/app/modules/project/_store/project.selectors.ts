import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';
import * as fromProject from './project.state';

export const getProjectState = createFeatureSelector<fromProject.ProjectState>(
  fromProject.ProjectFeatureKey
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromProject.ProjectAdapter.getSelectors(getProjectState);

export const hasProjects = createSelector(
  getProjectState,
  ProjectsState => ProjectsState.ids.length > 0
);

export const hasProject = createSelector(
  getProjectState,
  (ProjectsState, props) => ProjectsState.entities[props.id] ? true : false
);

export const selectProject = createSelector(
  getProjectState,
  (ProjectsState, props) => ProjectsState.entities[props.id]
);

export const selectProjects = createSelector(
  selectAll,
  entities => entities
);

export const selectMyProjects = createSelector(
  getAuthenticatedUserId,
  selectAll,
  (userId, entities) => entities.filter(p => p.ownerUserId == userId || p.projectUserIds.includes(userId) || p.invitedUserIds.includes(userId))
);



export const hasSelectedProject = createSelector(
  getProjectState,
  ProjectsState => ProjectsState.currentProjectId ? true : false
);

export const getSelectedProject = createSelector(
  getProjectState,
  ProjectsState => ProjectsState.entities[ProjectsState.currentProjectId]
);

export const getSelectedProjectId = createSelector(
  getProjectState,
  ProjectsState => ProjectsState.currentProjectId
);

export const selectedProjectHasGroups = createSelector(
  getProjectState,
  ProjectsState => ProjectsState.entities[ProjectsState.currentProjectId].projectGroups ? true : false
);

export const getSelectedProjectGroups = createSelector(
  getProjectState,
  ProjectsState => ProjectsState.entities[ProjectsState.currentProjectId].projectGroups
);

export const getSingleProjectGroup = createSelector(
  getProjectState,
  (ProjectsState, props) => ProjectsState.entities[ProjectsState.currentProjectId].projectGroups.find(pg => pg.id === props.id)
);

export const getProjectGroupsByIds = createSelector(
  getProjectState,
  (ProjectsState, props) => ProjectsState.entities[ProjectsState.currentProjectId].projectGroups.filter(pg => props.ids.contains(pg.id))
);