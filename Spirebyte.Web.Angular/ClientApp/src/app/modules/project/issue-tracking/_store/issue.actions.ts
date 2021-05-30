import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IssueCommentModel } from '../_models/issue-comment.model';
import { IssueHistoryModel } from '../_models/issue-history.model';
import { IssueUpdateModel } from '../_models/issue-update.model';
import { IssueModel } from '../_models/issue.model';

export const GET_ISSUES = '[System] Get Issues';
export const GET_ISSUES_SUCCESS = '[ISSUE effect] Get Issues success';
export const GET_ISSUES_FAILURE = '[ISSUE effect] Get Issues failure';

export const GET_SINGLE_ISSUE = '[System] Get single issue';
export const GET_SINGLE_ISSUE_SUCCESS = '[Issue effect] Get single issue success';
export const GET_SINGLE_ISSUE_FAILURE = '[Issue effect] Get single issue failure';

export const CREATE_ISSUE = '[CREATE issue component] CREATE issue';
export const CREATE_ISSUE_SUCCESS = '[Issue effect] CREATE issue success';
export const CREATE_ISSUE_FAILURE = '[Issue effect] CREATE issue failure';

export const UPDATE_ISSUE = '[Update issue component] Update issue';
export const UPDATE_ISSUE_SUCCESS = '[Issue effect] Update issue success';
export const UPDATE_ISSUE_FAILURE = '[Issue effect] Update issue failure';

export const DELETE_ISSUE = '[Delete issue component] Delete issue';
export const DELETE_ISSUE_SUCCESS = '[Issue effect] Delete issue success';
export const DELETE_ISSUE_FAILURE = '[Issue effect] Delete issue failure';

export const ADD_ISSUE_TO_STORE = '[Issue effect] Add issue to store';
export const UPDATE_ISSUE_IN_STORE = '[system] Update issue In store';
export const SELECT_ISSUE = '[system] Select issue';

export const LOAD_ISSUE_HISTORY = '[system] Load issue history';
export const LOAD_ISSUE_HISTORY_SUCCESS = '[Issue effect] Load issue history success';
export const LOAD_ISSUE_HISTORY_FAILURE = '[Issue effect] Load issue history failure';

export const LOAD_ISSUE_COMMENTS = '[system] Load issue comment';
export const LOAD_ISSUE_COMMENTS_SUCCESS = '[Issue effect] Load issue comment success';
export const LOAD_ISSUE_COMMENTS_FAILURE = '[Issue effect] Load issue comment failure';

export const ADD_ISSUE_COMMENT = '[system] Add issue comment';
export const ADD_ISSUE_COMMENT_SUCCESS = '[Issue effect] Add issue comment success';
export const ADD_ISSUE_COMMENT_FAILURE = '[Issue effect] Add issue comment failure';

export const UPDATE_ISSUE_COMMENT = '[system] Update issue comment';
export const UPDATE_ISSUE_COMMENT_SUCCESS = '[Issue effect] Update issue comment success';
export const UPDATE_ISSUE_COMMENT_FAILURE = '[Issue effect] Update issue comment failure';

export const DELETE_ISSUE_COMMENT = '[system] Delete issue comment';
export const DELETE_ISSUE_COMMENT_SUCCESS = '[Issue effect] Delete issue comment success';
export const DELETE_ISSUE_COMMENT_FAILURE = '[Issue effect] Delete issue comment failure';

export const getIssues = createAction(
    GET_ISSUES,
    props<{ projectId: string }>()
);

export const getIssuesSuccess = createAction(
    GET_ISSUES_SUCCESS,
    props<{ issues: IssueModel[] }>()
);

export const getIssuesFailure = createAction(
    GET_ISSUES_FAILURE,
    props<{ error: any }>()
);

export const getSingleIssue = createAction(
    GET_SINGLE_ISSUE,
    props<{ issueId: string }>()
);

export const getSingleIssueSuccess = createAction(
    GET_SINGLE_ISSUE_SUCCESS,
    props<{ issue: IssueModel }>()
);

export const getSingleIssueFailure = createAction(
    GET_SINGLE_ISSUE_FAILURE,
    props<{ error: any }>()
);

export const updateIssue = createAction(
    UPDATE_ISSUE,
    props<{ issue: IssueUpdateModel }>()
);

export const updateIssueSuccess = createAction(
    UPDATE_ISSUE_SUCCESS,
    props<{ issue: IssueUpdateModel }>()
);

export const updateIssueFailure = createAction(
    UPDATE_ISSUE_FAILURE,
    props<{ error: any }>()
);

export const deleteIssue = createAction(
    DELETE_ISSUE,
    props<{ issueId: string }>()
);

export const deleteIssueSuccess = createAction(
    DELETE_ISSUE_SUCCESS,
    props<{ issueId: string }>()
);

export const deleteIssueFailure = createAction(
    DELETE_ISSUE_FAILURE,
    props<{ error: any }>()
);

export const createIssue = createAction(
    CREATE_ISSUE,
    props<{ issue: IssueModel }>()
);

export const createIssueSuccess = createAction(
    CREATE_ISSUE_SUCCESS,
    props<{ issue: IssueModel }>()
);

export const createIssueFailure = createAction(
    CREATE_ISSUE_FAILURE,
    props<{ error: any }>()
);

export const addIssueToStore = createAction(
    ADD_ISSUE_TO_STORE,
    props<{ issue: IssueModel }>()
);

export const updateIssueInStore = createAction(
    UPDATE_ISSUE_IN_STORE,
    props<{ issue: Update<IssueUpdateModel> }>()
);

export const selectIssue = createAction(
    SELECT_ISSUE,
    props<{ issueId: string }>()
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// issue history

export const loadIssueHistory = createAction(
    LOAD_ISSUE_HISTORY,
    props<{ issueId: string }>()
);
export const loadIssueHistorySuccess = createAction(
    LOAD_ISSUE_HISTORY_SUCCESS,
    props<{ issueHistory: IssueHistoryModel[] }>()
);
export const loadIssueHistoryFailure = createAction(
    LOAD_ISSUE_HISTORY_FAILURE,
    props<{ error: any }>()
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// issue comments

export const loadIssueComments = createAction(
    LOAD_ISSUE_COMMENTS,
    props<{ issueId: string }>()
);
export const loadIssueCommentsSuccess = createAction(
    LOAD_ISSUE_COMMENTS_SUCCESS,
    props<{ issueComments: IssueCommentModel[] }>()
);
export const loadIssueCommentsFailure = createAction(
    LOAD_ISSUE_COMMENTS_FAILURE,
    props<{ error: any }>()
);

export const addIssueComment = createAction(
    ADD_ISSUE_COMMENT,
    props<{ issueComment: IssueCommentModel }>()
);
export const addIssueCommentSuccess = createAction(
    ADD_ISSUE_COMMENT_SUCCESS,
    props<{ issueComment: IssueCommentModel }>()
);
export const addIssueCommentFailure = createAction(
    ADD_ISSUE_COMMENT_FAILURE,
    props<{ error: any }>()
);

export const updateIssueComment = createAction(
    UPDATE_ISSUE_COMMENT,
    props<{ issueComment: IssueCommentModel, returnUrl?: string }>()
);
export const updateIssueCommentSuccess = createAction(
    UPDATE_ISSUE_COMMENT_SUCCESS,
    props<{ issueComment: IssueCommentModel, returnUrl?: string  }>()
);
export const updateIssueCommentFailure = createAction(
    UPDATE_ISSUE_COMMENT_FAILURE,
    props<{ error: any }>()
);

export const deleteIssueComment = createAction(
    DELETE_ISSUE_COMMENT,
    props<{ issueCommentId: string }>()
);
export const deleteIssueCommentSuccess = createAction(
    DELETE_ISSUE_COMMENT_SUCCESS,
    props<{ issueCommentId: string }>()
);
export const deleteIssueCommentFailure = createAction(
    DELETE_ISSUE_COMMENT_FAILURE,
    props<{ error: any }>()
);