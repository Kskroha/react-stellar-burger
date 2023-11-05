import {
  register,
  login,
  getUserData,
  update,
  logout,
  reset,
  requestChange,
} from "../api";
import { TIngredient, TInputValue, TUser } from "../../types/types";
import { AppDispatch, AppThunk } from "../../types";
import {
  CLEAN_STATE,
  REQUEST_CHANGE_SUCCESS,
  REQUEST_FAILED,
  RESET_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
} from "../constants";

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: null | TUser;
}

export interface ISetErrorAction {
  readonly type: typeof REQUEST_FAILED;
  readonly error: { message: string };
}

export interface ICleanStateAction {
  readonly type: typeof CLEAN_STATE;
}

export interface IRequestChangeSuccessAction {
  readonly type: typeof REQUEST_CHANGE_SUCCESS;
  order: TIngredient[];
}

export interface IResetSuccessAction {
  readonly type: typeof RESET_SUCCESS;
}

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: null | TUser): ISetUserAction => ({
  type: SET_USER,
  user,
});

export const setError = (error: { message: string }): ISetErrorAction => ({
  type: REQUEST_FAILED,
  error,
});

export const setRequestChangeSuccess = (
  res: any
): IRequestChangeSuccessAction => ({
  type: REQUEST_CHANGE_SUCCESS,
  order: res.order,
});

export const cleanState = (): ICleanStateAction => ({
  type: CLEAN_STATE,
});

export const setResetSuccess = (): IResetSuccessAction => ({
  type: RESET_SUCCESS,
});

export const updateUserInfo: AppThunk =
  (userData: TInputValue) => (dispatch: AppDispatch) => {
    return update(userData)
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };

export const registerNewUser: AppThunk =
  (userData: TInputValue) => (dispatch: AppDispatch) => {
    return register(userData)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return getUserData()
      .then((res: any) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const userLogout: AppThunk = () => (dispatch: AppDispatch) => {
  return logout()
    .then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    })
    .catch((error) => {
      dispatch(setError(error.message));
    })
    .finally(() => {
      setTimeout(() => dispatch(cleanState()), 3500);
    });
};

export const userLogin: AppThunk =
  (userData: TInputValue) => (dispatch: AppDispatch) => {
    return login(userData)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
        dispatch(setUser(res.user));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };

export const requestPasswordChange: AppThunk =
  (userEmail: TInputValue) => (dispatch: AppDispatch) => {
    return requestChange(userEmail)
      .then((res: any) => {
        dispatch(setRequestChangeSuccess(res));
      })
      .catch((error: any) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };

export const resetPassword: AppThunk =
  (userData: TInputValue) => (dispatch: AppDispatch) => {
    return reset(userData)
      .then(() => {
        dispatch(setResetSuccess());
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };

  export type TUserActions =
  | ISetAuthCheckedAction
  | ISetUserAction
  | ISetErrorAction
  | ICleanStateAction
  | IRequestChangeSuccessAction
  | IResetSuccessAction;
