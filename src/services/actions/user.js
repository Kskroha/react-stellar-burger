import {
  register,
  login,
  getUserData,
  update,
  logout,
  checkResponse,
  requestChange,
  reset,
} from "../api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const CHANGE_PASSWORD_REQUEST_SUCCESS =
  "CHANGE_PASSWORD_REQUEST_SUCCESS";
export const RESET_SUCCESS = "RESET_SUCCESS";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return getUserData().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const updateUserInfo = (userData) => {
  return (dispatch) => {
    return update(userData)
      .then((res) => checkResponse(res))
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const registerNewUser = (userData) => {
  return (dispatch) => {
    return register(userData)
      .then((res) => checkResponse(res))
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
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
  return (dispatch) => {
    return logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};

export const userLogin = (userData) => {
  return (dispatch) => {
    return login(userData)
      .then((res) => checkResponse(res))
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
        dispatch(setUser(res.user));
      });
  };
};

export const requestPasswordChange = (userEmail) => {
  return (dispatch) => {
    return requestChange(userEmail)
      .then((res) => checkResponse(res))
      .then((res) => {
        dispatch({
          type: CHANGE_PASSWORD_REQUEST_SUCCESS,
          order: res.order,
        });
      });
  };
};

export const resetPassword = (userPassword) => {
  return (dispatch) => {
    return reset(userPassword)
      .then((res) => checkResponse(res))
      .then((res) => {
        dispatch({
          type: RESET_SUCCESS,
        });
      });
  };
};
