import { createReducer, on } from '@ngrx/store';
import { initialState, ProjectAdapter } from './project.state';

import * as ProjectActions from './project.actions';
import { immerOn } from 'ngrx-immer/store';

export const ProjectReducer = createReducer(
    initialState,

    on(ProjectActions.getProjectsSuccess, (state, action) => {
        return ProjectAdapter.addMany(action.projects, {...state, error: initialState.error});
    }),
    on(ProjectActions.getSingleProjectSuccess, ProjectActions.createProjectSuccess, (state, action) => {
        return ProjectAdapter.upsertOne(action.project, {...state, error: initialState.error});
    }),
    on(ProjectActions.createProjectSuccess, (state, action) => {
        return ProjectAdapter.addOne(action.project, {...state, error: initialState.error});
    }),
    on(ProjectActions.addProjectToStore, (state, action) => {
        return ProjectAdapter.addOne(action.project, {...state});
    }),
    on(ProjectActions.getProjectsFailure, (state, action) => {
        return {...initialState, error: action.error};
    }),
    on(ProjectActions.selectProject, (state, action) => {
        return {...state, currentProjectId: action.projectId};
    }),
    on(ProjectActions.createProjectSuccess, (state, action) => {
        return ProjectAdapter.addOne(action.project, {...state, error: initialState.error});
    }),

    immerOn(ProjectActions.joinProjectSuccess, (state, action) => {
        let project = state.entities[state.currentProjectId];
        project.projectUserIds.push(action.userId);
        const invitedUserIdIndex = project.invitedUserIds.findIndex(iu => iu == action.userId)
        project.invitedUserIds.slice(invitedUserIdIndex, 1);
    }),

    
    immerOn(ProjectActions.leaveProjectSuccess, (state, action) => {
        let project = state.entities[state.currentProjectId];
        const invitedUserIdIndex = project.invitedUserIds.findIndex(iu => iu == action.userId)
        project.invitedUserIds.slice(invitedUserIdIndex, 1);
    }),

    immerOn(ProjectActions.loadProjectGroupsSuccess, (state, action) => {
        state.entities[state.currentProjectId].projectGroupsLoaded = true;
        state.entities[state.currentProjectId].projectGroups = action.projectGroups;
    }),
    immerOn(ProjectActions.loadSingleProjectGroupSuccess, ProjectActions.addProjectGroup, (state, action) => {
        state.entities[state.currentProjectId].projectGroups.push(action.projectGroup);
    }),
    immerOn(ProjectActions.updateProjectGroupSuccess, (state, action) => {
        let projectGroup = state.entities[state.currentProjectId].projectGroups.find(pg => pg.id === action.projectGroup.id);
        console.log(projectGroup);
        console.log(action.projectGroup);
        projectGroup.userIds = action.projectGroup.userIds;
        projectGroup.name = action.projectGroup.name;
    }),
    immerOn(ProjectActions.deleteProjectGroupSuccess, (state, action) => {
        let projectGroups = state.entities[state.currentProjectId].projectGroups;
        let projectGroupIndex = projectGroups.findIndex(pg => pg.id === action.projectGroupId);
        projectGroups.splice(projectGroupIndex, 1);
    }),
);
