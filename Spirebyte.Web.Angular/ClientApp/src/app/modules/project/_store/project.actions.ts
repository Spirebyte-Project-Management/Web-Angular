import { createAction, props } from '@ngrx/store';
import { ProjectModel } from '../_models/project.model';
import { ProjectGroupModel } from '../_models/projectGroup.model';
import { ProjectUpdateModel } from '../_models/updateProject.model';

export const GET_PROJECTS = '[System] Get Projects';
export const GET_PROJECTS_SUCCESS = '[Project effect] Get Projects success';
export const GET_PROJECTS_FAILURE = '[Project effect] Get Projects failure';

export const GET_SINGLE_PROJECT = '[System] Get single project';
export const GET_SINGLE_PROJECT_SUCCESS = '[Project effect] Get single project success';
export const GET_SINGLE_PROJECT_FAILURE = '[Project effect] Get single project failure';

export const CREATE_PROJECT = '[CREATE project component] CREATE project';
export const CREATE_PROJECT_SUCCESS = '[Project effect] CREATE Project success';
export const CREATE_PROJECT_FAILURE = '[Project effect] CREATE Project failure';

export const UPDATE_PROJECT = '[Update project component] Update project';
export const UPDATE_PROJECT_SUCCESS = '[Project effect] Update Project success';
export const UPDATE_PROJECT_FAILURE = '[Project effect] Update Project failure';

export const JOIN_PROJECT = '[Invitation component] Join project';
export const JOIN_PROJECT_SUCCESS = '[Project effect] Join Project success';
export const JOIN_PROJECT_FAILURE = '[Project effect] Join Project failure';

export const LEAVE_PROJECT = '[Invitation component] Leave project';
export const LEAVE_PROJECT_SUCCESS = '[Project effect] Leave Project success';
export const LEAVE_PROJECT_FAILURE = '[Project effect] Leave Project failure';

export const ADD_PROJECT_TO_STORE = '[Project effect] Add Project to store';
export const SELECT_PROJECT = '[system] Select project';

export const LOAD_PROJECTGROUPS = '[system] Load project groups';
export const LOAD_PROJECTGROUPS_SUCCESS = '[Project effect] Load project groups success';
export const LOAD_PROJECTGROUPS_FAILURE = '[Project effect] Load project groups failure';

export const LOAD_SINGLE_PROJECTGROUP = '[system] Load single project group';
export const LOAD_SINGLE_PROJECTGROUP_SUCCESS = '[Project effect] Load single project group success';
export const LOAD_SINGLE_PROJECTGROUP_FAILURE = '[Project effect] Load single project group failure';

export const ADD_PROJECTGROUP = '[system] Add project group';
export const ADD_PROJECTGROUP_SUCCESS = '[Project effect] Add project group success';
export const ADD_PROJECTGROUP_FAILURE = '[Project effect] Add project group failure';

export const UPDATE_PROJECTGROUP = '[system] Update project group';
export const UPDATE_PROJECTGROUP_SUCCESS = '[Project effect] Update project group success';
export const UPDATE_PROJECTGROUP_FAILURE = '[Project effect] Update project group failure';

export const DELETE_PROJECTGROUP = '[system] Delete project group';
export const DELETE_PROJECTGROUP_SUCCESS = '[Project effect] Delete project group success';
export const DELETE_PROJECTGROUP_FAILURE = '[Project effect] Delete project group failure';

export const getProjects = createAction(
    GET_PROJECTS
);

export const getProjectsSuccess = createAction(
    GET_PROJECTS_SUCCESS,
    props<{ projects: ProjectModel[] }>()
);

export const getProjectsFailure = createAction(
    GET_PROJECTS_FAILURE,
    props<{ error: any }>()
);

export const getSingleProject = createAction(
    GET_SINGLE_PROJECT,
    props<{ projectId: string }>()
);

export const getSingleProjectSuccess = createAction(
    GET_SINGLE_PROJECT_SUCCESS,
    props<{ project: ProjectModel }>()
);

export const getSingleProjectFailure = createAction(
    GET_SINGLE_PROJECT_FAILURE,
    props<{ error: any }>()
);

export const updateProject = createAction(
    UPDATE_PROJECT,
    props<{ project: ProjectUpdateModel, returnUrl?: string }>()
);

export const updateProjectSuccess = createAction(
    UPDATE_PROJECT_SUCCESS,
    props<{ project: ProjectUpdateModel, returnUrl?: string }>()
);

export const updateProjectFailure = createAction(
    UPDATE_PROJECT_FAILURE,
    props<{ error: any }>()
);

export const createProject = createAction(
    CREATE_PROJECT,
    props<{ project: ProjectModel }>()
);

export const createProjectSuccess = createAction(
    CREATE_PROJECT_SUCCESS,
    props<{ project: ProjectModel }>()
);

export const createProjectFailure = createAction(
    CREATE_PROJECT_FAILURE,
    props<{ error: any }>()
);

export const addProjectToStore = createAction(
    ADD_PROJECT_TO_STORE,
    props<{ project: ProjectModel }>()
);

export const selectProject = createAction(
    SELECT_PROJECT,
    props<{ projectId: string }>()
);

export const joinProject = createAction(
    JOIN_PROJECT,
    props<{ userId: string }>()
);

export const joinProjectSuccess = createAction(
    JOIN_PROJECT_SUCCESS,
    props<{ userId: string }>()
);

export const joinProjectFailure = createAction(
    JOIN_PROJECT_FAILURE,
    props<{ error: any }>()
);

export const leaveProject = createAction(
    LEAVE_PROJECT,
    props<{ userId: string }>()
);

export const leaveProjectSuccess = createAction(
    LEAVE_PROJECT_SUCCESS,
    props<{ userId: string }>()
);

export const leaveProjectFailure = createAction(
    LEAVE_PROJECT_FAILURE,
    props<{ error: any }>()
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// project groups

export const loadProjectGroups = createAction(
    LOAD_PROJECTGROUPS,
    props<{ projectId: string }>()
);
export const loadProjectGroupsSuccess = createAction(
    LOAD_PROJECTGROUPS_SUCCESS,
    props<{ projectGroups: ProjectGroupModel[] }>()
);
export const loadProjectGroupsFailure = createAction(
    LOAD_PROJECTGROUPS_FAILURE,
    props<{ error: any }>()
);

export const loadSingleProjectGroup = createAction(
    LOAD_SINGLE_PROJECTGROUP,
    props<{ projectGroupId: string }>()
);
export const loadSingleProjectGroupSuccess = createAction(
    LOAD_SINGLE_PROJECTGROUP_SUCCESS,
    props<{ projectGroup: ProjectGroupModel }>()
);
export const loadSingleProjectGroupFailure = createAction(
    LOAD_SINGLE_PROJECTGROUP_FAILURE,
    props<{ error: any }>()
);

export const addProjectGroup = createAction(
    ADD_PROJECTGROUP,
    props<{ projectGroup: ProjectGroupModel }>()
);
export const addProjectGroupSuccess = createAction(
    ADD_PROJECTGROUP_SUCCESS,
    props<{ projectGroup: ProjectGroupModel }>()
);
export const addProjectGroupFailure = createAction(
    ADD_PROJECTGROUP_FAILURE,
    props<{ error: any }>()
);

export const updateProjectGroup = createAction(
    UPDATE_PROJECTGROUP,
    props<{ projectGroup: ProjectGroupModel, returnUrl?: string }>()
);
export const updateProjectGroupSuccess = createAction(
    UPDATE_PROJECTGROUP_SUCCESS,
    props<{ projectGroup: ProjectGroupModel, returnUrl?: string  }>()
);
export const updateProjectGroupFailure = createAction(
    UPDATE_PROJECTGROUP_FAILURE,
    props<{ error: any }>()
);

export const deleteProjectGroup = createAction(
    DELETE_PROJECTGROUP,
    props<{ projectGroupId: string }>()
);
export const deleteProjectGroupSuccess = createAction(
    DELETE_PROJECTGROUP_SUCCESS,
    props<{ projectGroupId: string }>()
);
export const deleteProjectGroupFailure = createAction(
    DELETE_PROJECTGROUP_FAILURE,
    props<{ error: any }>()
);