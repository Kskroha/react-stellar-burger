import {
  register,
  login,
  getUserData,
  update,
  logout,
  requestChange,
  reset,
} from "../api";
import { TInputValue } from "../../types/types";
import { AppDispatch } from "../store";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const REQUEST_CHANGE_SUCCESS = "REQUEST_CHANGE_SUCCESS";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const CLEAN_STATE = "CLEAN_STATE";

export const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TInputValue | null) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return getUserData()
      .then((res) => {
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

export const setError = (err: any) => ({
  type: REQUEST_FAILED,
  payload: err.message,
});

export const cleanState = () => ({
  type: CLEAN_STATE,
});

export const updateUserInfo = (userData: TInputValue) => {
  return (dispatch: AppDispatch) => {
    return update(userData)
      .then((res) => {
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

export const registerNewUser = (userData: TInputValue) => {
  return (dispatch: AppDispatch) => {
    return register(userData)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
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
  return (dispatch: any) => {
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

export const userLogout = () => {
  return (dispatch: AppDispatch) => {
    return logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };
};

export const userLogin = (userData: TInputValue) => {
  return (dispatch: AppDispatch) => {
    return login(userData)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
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

export const requestPasswordChange = (userEmail: TInputValue) => {
  return (dispatch: AppDispatch) => {
    return requestChange(userEmail)
      .then((res) => {
        dispatch({
          type: REQUEST_CHANGE_SUCCESS,
          order: res.order,
        });
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };
};

export const resetPassword = (userData: TInputValue) => {
  return (dispatch: AppDispatch) => {
    return reset(userData)
      .then(() => {
        dispatch({
          type: RESET_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        setTimeout(() => dispatch(cleanState()), 3500);
      });
  };
};
