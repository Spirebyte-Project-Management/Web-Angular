import { createReducer, on } from '@ngrx/store';
import { initialState, IssueAdapter } from './issue.state';

import * as IssueActions from './issue.actions';
import { immerOn } from 'ngrx-immer/store';

export const IssueReducer = createReducer(
    initialState,

    on(IssueActions.getIssuesSuccess, (state, action) => {
        return IssueAdapter.addMany(action.issues, {...state, error: initialState.error});
    }),
    on(IssueActions.getSingleIssueSuccess, IssueActions.createIssueSuccess, (state, action) => {
        return IssueAdapter.upsertOne(action.issue, {...state, error: initialState.error});
    }),
    on(IssueActions.createIssueSuccess, (state, action) => {
        return IssueAdapter.addOne(action.issue, {...state, error: initialState.error});
    }),
    on(IssueActions.deleteIssueSuccess, (state, action) => {
        return IssueAdapter.removeOne(action.issueId, {...state, error: initialState.error});
    }),
    on(IssueActions.addIssueToStore, (state, action) => {
        return IssueAdapter.addOne(action.issue, {...state});
    }),
    on(IssueActions.updateIssueInStore, (state, action) => {
        return IssueAdapter.updateOne(action.issue, {...state});
    }),
    on(IssueActions.getIssuesFailure, (state, action) => {
        return {...initialState, error: action.error};
    }),
    on(IssueActions.selectIssue, (state, action) => {
        return {...state, currentIssueId: action.issueId};
    }),
    on(IssueActions.createIssueSuccess, (state, action) => {
        return IssueAdapter.addOne(action.issue, {...state, error: initialState.error});
    }),
    immerOn(IssueActions.loadIssueHistorySuccess, (state, action) => {
        state.entities[state.currentIssueId].history = action.issueHistory;
    }),
    immerOn(IssueActions.loadIssueCommentsSuccess, (state, action) => {
        state.entities[state.currentIssueId].comments = action.issueComments;
    }),
    immerOn(IssueActions.addIssueCommentSuccess, (state, action) => {
        state.entities[state.currentIssueId].comments.push(action.issueComment);
    }),
    immerOn(IssueActions.updateIssueCommentSuccess, (state, action) => {
        let issueComment = state.entities[state.currentIssueId].comments.find(pg => pg.id === action.issueComment.id);
        issueComment.body = action.issueComment.body;
    }),
    immerOn(IssueActions.deleteIssueCommentSuccess, (state, action) => {
        let issueComments = state.entities[state.currentIssueId].comments;
        let issueCommentIndex = issueComments.findIndex(pg => pg.id === action.issueCommentId);
        issueComments.splice(issueCommentIndex, 1);
    }),
);
