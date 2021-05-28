import { createAction, props } from '@ngrx/store';
import { ProfileModel } from 'src/app/_models/updateProfile.model';
import { UserModel } from 'src/app/_models/user.model';

export const UPDATE_PROFILE = '[Settings Component] Update profile';
export const UPDATE_PROFILE_SUCCESS = '[Auth Effect] Update profile success';
export const UPDATE_PROFILE_FAILURE = '[Auth Effect] Update profile failure';

export const GET_USERDATA_SUCCESS = '[Auth Effect] Get UserData success';
export const GET_USERDATA_FAILURE = '[Auth Effect] Get UserData failure';


export const getUserDataSuccess = createAction(
    GET_USERDATA_SUCCESS,
    props<{ user: UserModel }>()
);

export const getUserDataFailure = createAction(
    GET_USERDATA_FAILURE,
    props<{ error: any }>()
);

export const updateProfile = createAction(
    UPDATE_PROFILE,
    props<{ profile: ProfileModel }>()
);

export const updateProfileSuccess = createAction(
    UPDATE_PROFILE_SUCCESS,
    props<{ profile: ProfileModel }>()
);

export const updateProfileFailure = createAction(
    UPDATE_PROFILE_FAILURE,
    props<{ error: any }>()
);