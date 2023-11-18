import { AppDispatch, AppThunk } from "../../types";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../constants";
import { getIngredientsRequest } from "../api";
import { TIngredient } from "../../types/types";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  items: TIngredient[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TBurgerInredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction

export const requestInredients = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const setRequestSuccess = (res: {
  data: TIngredient[];
}): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  items: res.data,
});

export const setRequestFailed = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(requestInredients());
  getIngredientsRequest()
    .then((res) => dispatch(setRequestSuccess(res)))
    .catch(() => dispatch(setRequestFailed()));
};
