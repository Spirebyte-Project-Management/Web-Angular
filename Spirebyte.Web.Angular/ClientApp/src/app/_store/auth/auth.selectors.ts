import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.state';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>(
    fromAuth.authFeatureKey
);

export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.user ? true : false;
});

export const isAuthLoading = createSelector(getAuthState, (state) => {
    return state.isLoading;
});

export const isForgotPasswordSent = createSelector(getAuthState, (state) => {
    return state.forgotPasswordSent;
});

export const isPasswordReset = createSelector(getAuthState, (state) => {
    return state.resetPassword;
});

export const authHasError = createSelector(getAuthState, (state) => {
    return state.error ? true : false;
});

export const getAuthError = createSelector(getAuthState, (state) => {
    return state.error;
});


export const getAuthenticatedUser = createSelector(getAuthState, (state) => {
    return state.user;
});

export const getAuthenticatedUserId = createSelector(getAuthState, (state) => {
    return state.user.id;
});

export const getToken = createSelector(getAuthState, (state) => {
    return state.user ? state.user.accessToken : null;
});

export const getRefreshToken = createSelector(getAuthState, (state) => {
    return state.user ? state.user.refreshToken : null;
});
