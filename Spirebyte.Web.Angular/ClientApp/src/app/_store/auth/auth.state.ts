import { UserModel } from "src/app/_models/user.model";

export const authFeatureKey = 'auth';

export interface AuthState {
    user: UserModel;
    error: any;
    isLoading: boolean;
    forgotPasswordSent: boolean;
    resetPassword: boolean;
}

export const initialState: AuthState = {
    user: null,
    error: null,
    isLoading: false,
    forgotPasswordSent: true,
    resetPassword: true,
};