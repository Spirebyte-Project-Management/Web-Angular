import { createAction, props } from '@ngrx/store';
import { RegisterModel } from 'src/app/_models/register.model';
import { UserModel } from 'src/app/_models/user.model';

export const LOGIN_START = '[Login Component] Login started';
export const LOGIN_SUCCESS = '[Auth Effect] Login success';
export const LOGIN_FAILURE = '[Auth Effect] Login failure';

export const REGISTER_START = '[Register Component] Register started';
export const REGISTER_SUCCESS = '[Auth Effect] Register success';
export const REGISTER_FAILURE = '[Auth Effect] Register failure';

export const FORGOT_PASSWORD_START = '[Forgot password Component] Forgot password started';
export const FORGOT_PASSWORD_SUCCESS = '[Auth Effect] Forgot password success';
export const FORGOT_PASSWORD_FAILURE = '[Auth Effect] Forgot password failure';

export const RESET_PASSWORD_START = '[Reset password Component] Reset password started';
export const RESET_PASSWORD_SUCCESS = '[Auth Effect] Reset password success';
export const RESET_PASSWORD_FAILURE = '[Auth Effect] Reset password failure';

export const LOGOUT = '[Profile Aside] logout';

export const AUTO_REFRESHTOKEN_ACTION = '[System] auto refresh token';
export const AUTO_REFRESHTOKEN_ACTION_SUCCESS = '[System] auto refresh token success';
export const AUTO_REFRESHTOKEN_ACTION_FAILURE = '[System] auto refresh token failure';

export const AUTO_LOGIN_ACTION = '[System] auto login';
export const AUTO_LOGIN_SUCCESS = '[Auth Effect] Auto login success';
export const AUTO_LOGOUT_ACTION = '[System] logout';

export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{ auth: UserModel }>()
);

export const autoLoginSuccess = createAction(
    AUTO_LOGIN_SUCCESS,
    props<{ auth: UserModel }>()
);

export const loginFailure = createAction(
    LOGIN_FAILURE,
    props<{ error: any }>()
);


export const registerStart = createAction(
    REGISTER_START,
    props<{ registerModel: RegisterModel }>()
);

export const registerSuccess = createAction(
    REGISTER_SUCCESS,
    props<{ registerModel: RegisterModel; }>()
);

export const registerFailure = createAction(
    REGISTER_FAILURE,
    props<{ error: any; }>()
);

export const forgotPasswordStart = createAction(
    FORGOT_PASSWORD_START,
    props<{ email: string }>()
);

export const forgotPasswordSuccess = createAction(
    FORGOT_PASSWORD_SUCCESS,
);

export const forgotPasswordFailure = createAction(
    FORGOT_PASSWORD_FAILURE,
    props<{ error: any; }>()
);

export const resetPasswordStart = createAction(
    RESET_PASSWORD_START,
    props<{ userId: string, password: string, token: string }>()
);

export const resetPasswordSuccess = createAction(
    RESET_PASSWORD_SUCCESS,
);

export const resetPasswordFailure = createAction(
    RESET_PASSWORD_FAILURE,
    props<{ error: any; }>()
);

export const autoRefreshTokenSuccess = createAction(
    AUTO_REFRESHTOKEN_ACTION_SUCCESS,
    props<{ auth: UserModel }>()
);

export const autoRefreshTokenFailure = createAction(
    AUTO_REFRESHTOKEN_ACTION_FAILURE,
    props<{ error: any; }>()
);

export const logout = createAction(LOGOUT);
export const autoRefreshToken = createAction(AUTO_REFRESHTOKEN_ACTION);
export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(AUTO_LOGOUT_ACTION);
