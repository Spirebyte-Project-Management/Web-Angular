import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';
import * as UserActions from '../user/user.actions';
import { immerOn } from 'ngrx-immer/store';

export const authReducer = createReducer(
    initialState,

    on(AuthActions.loginStart, AuthActions.autoLogin, (state, action) => {
        return {
            ...state,
            isLoading: true
        };
    }),

    on(AuthActions.loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.auth
        };
    }),
    immerOn(AuthActions.autoRefreshTokenSuccess, (state, action) => {
        const user = state.user;
        user.accessToken = action.auth.accessToken;
        user.refreshToken = action.auth.refreshToken;
        user.expires = action.auth.expires;
    }),
    on(AuthActions.forgotPasswordSuccess, (state, action) => {
        return {
            ...state,
            forgotPasswordSent: true
        };
    }),
    on(AuthActions.resetPasswordSuccess, (state, action) => {
        return {
            ...state,
            resetPassword: true
        };
    }),
    on(AuthActions.loginFailure, AuthActions.registerFailure, AuthActions.forgotPasswordFailure, AuthActions.resetPasswordFailure, (state, action) => {
        return {
            ...state,
            user: initialState.user,
            error: action.error,
            isLoading: false,
            forgotPasswordSent: false,
            resetPassword: false
        };
    }),
    on(AuthActions.logout, AuthActions.autoLogout, (state, action) => {
        return {
            ...state,
            user: initialState.user,
            error: initialState.error,
            isLoading: false
        };
    }),
    on(UserActions.getUserDataSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            isLoading: false
        };
    }),
    immerOn(UserActions.updateProfileSuccess, (state, action) => {
        const user = state.user;
        user.fullname = action.profile.fullname;
        user.email = action.profile.email;

        if (action.profile.file === 'delete') {
            user.pic = undefined;
        } else{
            user.pic = action.profile.file !== '' ? action.profile.file : user.pic;
        }

    }),
    on(UserActions.getUserDataFailure, (state, action) => {
        return {
            ...state,
            user: initialState.user,
            error: action.error,
            isLoading: false
        };
    }),
);
