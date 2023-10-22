import {
  SET_AUTH_CHECKED,
  SET_USER,
  REQUEST_CHANGE_SUCCESS,
  RESET_SUCCESS,
  REQUEST_FAILED,
  CLEAN_STATE
} from "../actions/user";

const initialState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  requestSuccess: false,
  requestFailed: false,
  resetSucces: false,
  errorMessage: "",
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
    case REQUEST_CHANGE_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        resetSuccess: true,
        requestSuccess: false,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        resetSuccess: false,
        requestFailed: true,
        errorMessage: action.payload
      };
    case CLEAN_STATE:
      return {
        ...state,
        requestFailed: false,
        errorMessage: ""
      };
    default:
      return state;
  }
};
