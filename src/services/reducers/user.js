import {
  SET_AUTH_CHECKED,
  SET_USER,
  CHANGE_PASSWORD_REQUEST_SUCCESS,
  RESET_SUCCESS,
} from "../actions/user";

const initialState = {
  user: null,
  isAuthChecked: false,
  passwordChangeRequestSuccess: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        passwordChangeRequestSuccess: true,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        passwordChangeRequestSuccess: false,
      };
    default:
      return state;
  }
};
