import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';
import { selectQueryParams } from 'src/app/_store/router/router.selectors';
import { getSelectedProjectId } from '../../_store/project.selectors';
import { IssueStatus, IssueType } from '../_models/issue.model';
import * as fromIssue from './issue.state';

export const getIssueState = createFeatureSelector<fromIssue.IssueState>(
  fromIssue.IssueFeatureKey
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = fromIssue.IssueAdapter.getSelectors(getIssueState);

export const hasIssues = createSelector(
  getIssueState,
  IssuesState => IssuesState.ids.length > 0
);

export const getSelectedEpicId = createSelector(
  getIssueState,
  IssueState => IssueState.selectedEpicId
);

export const hasSelectedEpic = createSelector(
  getSelectedEpicId,
  selectedEpicId => selectedEpicId ? true : false
);

export const projectHasIssues = createSelector(
  selectAll,
  getSelectedProjectId,
  (issues, projectId) => issues.filter(i => i.projectId === projectId).length > 0
);

export const getSelectedProjectIssues = createSelector(
  selectAll,
  getSelectedProjectId,
  (issues, projectId) => issues.filter(i => i.projectId === projectId)
);

export const getSelectedProjectEpics = createSelector(
  selectAll,
  getSelectedProjectId,
  (issues, projectId) => issues.filter(i => i.projectId === projectId && i.type === IssueType.Epic)
);

export const getSelectedProjectBacklog = createSelector(
  selectAll,
  getSelectedProjectId,
  (issues, projectId) => issues.filter(i => i.projectId === projectId && i.sprintId === null && i.type != IssueType.Epic && i.status !== IssueStatus.DONE)
);

export const getSelectedProjectBacklogFiltered = createSelector(
  selectAll,
  getSelectedProjectId,
  getSelectedEpicId,
  (issues, projectId, epicId) => issues.filter(i => i.projectId === projectId && i.sprintId === null && i.type != IssueType.Epic && (epicId === null ? true : i.epicId === epicId) && i.status !== IssueStatus.DONE)
);

export const getSelectedProjectBacklogIssueCount = createSelector(
  getSelectedProjectBacklog,
  (backlog) => backlog.length
)

export const getSelectedProjectIssuesBySprint= createSelector(
  selectAll,
  getSelectedProjectId,
  (issues, projectId, props) => issues.filter(i => i.projectId === projectId && i.sprintId === props.sprintId && i.type !== IssueType.Epic)
);

export const getSelectedProjectIssuesBySprintFiltered = createSelector(
  selectAll,
  getSelectedProjectId,
  getSelectedEpicId,
  (issues, projectId, epicId, props) => issues.filter(i => i.projectId === projectId && i.sprintId === props.sprintId && (epicId === null ? true : i.epicId === epicId) && i.type !== IssueType.Epic && i.status !== IssueStatus.DONE)
);

export const getSelectedProjectIssuesByEpic= createSelector(
  selectAll,
  getSelectedProjectId,
  (issues, projectId, props) => issues.filter(i => i.projectId === projectId && i.epicId === props.epicId)
);

export const hasIssue = createSelector(
  getIssueState,
  (IssuesState, props) => IssuesState.entities[props.id] ? true : false
);

export const selectIssue = createSelector(
  getIssueState,
  (IssuesState, props) => IssuesState.entities[props.id]
);

export const selectIssues = createSelector(
  selectAll,
  entities => entities
);

export const getSelectedIssueId = createSelector(
  selectQueryParams,
  ({ selectedIssue }) => selectedIssue
);

export const hasSelectedIssue = createSelector(
  getSelectedIssueId,
  selectedIssueId => selectedIssueId ? true : false
);

export const getSelectedIssue = createSelector(
  getIssueState,
  getSelectedIssueId,
  (IssuesState, selectedIssueId) => IssuesState.entities[selectedIssueId]
);

export const selectedIssueHasComments = createSelector(
  getIssueState,
  getSelectedIssueId,
  (IssuesState, selectedIssueId) => IssuesState.entities[selectedIssueId].comments ? true : false
);

export const getSelectedIssueComments = createSelector(
  getIssueState,
  getSelectedIssueId,
  (IssuesState, selectedIssueId) => IssuesState.entities[selectedIssueId].comments
);

export const selectedIssueHasHistory = createSelector(
  getIssueState,
  getSelectedIssueId,
  (IssuesState, selectedIssueId) => IssuesState.entities[selectedIssueId].history ? true : false
);

export const getSelectedIssueHistory = createSelector(
  getIssueState,
  getSelectedIssueId,
  (IssuesState, selectedIssueId) => IssuesState.entities[selectedIssueId].history
);

export const getSingleIssueComments = createSelector(
  getIssueState,
  getSelectedIssueId,
  (IssuesState, selectedIssueId, props) => IssuesState.entities[selectedIssueId].comments.find(pg => pg.id === props.id)
);