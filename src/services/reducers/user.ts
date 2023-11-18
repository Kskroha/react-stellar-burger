import { TUser } from "../../types/types";
import { TUserActions } from "../actions/user";
import {
  SET_AUTH_CHECKED,
  SET_USER,
  REQUEST_CHANGE_SUCCESS,
  RESET_SUCCESS,
  REQUEST_FAILED,
  CLEAN_STATE,
} from "../constants";

type TUserInitialState = {
  user: null | TUser,
  isLoading: boolean;
  isAuthChecked: boolean;
  requestSuccess: boolean;
  requestFailed: boolean;
  resetSucces: boolean;
  errorMessage: string;
};

const initialState: TUserInitialState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  requestSuccess: false,
  requestFailed: false,
  resetSucces: false,
  errorMessage: "",
};

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
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
        errorMessage: action.error,
      };
    case CLEAN_STATE:
      return {
        ...state,
        requestFailed: false,
        errorMessage: "",
      };
    default:
      return state;
  }
};
