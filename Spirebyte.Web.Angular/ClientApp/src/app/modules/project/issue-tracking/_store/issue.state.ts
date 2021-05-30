import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IssueModel } from '../_models/issue.model';

export const IssueFeatureKey = 'issues';

export interface IssueState extends EntityState<IssueModel> {
    error: any;
    currentIssueId: string;
}

export const IssueAdapter = createEntityAdapter<IssueModel>();


export const initialState: IssueState = IssueAdapter.getInitialState({
    error: null,
    currentIssueId: null
});