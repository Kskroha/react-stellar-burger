import { sendOrderRequest } from "../api";
import { AppDispatch } from "../../types";
import { TIngredient, TOrder } from "../../types/types";
import {
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  CLOSE_MODAL,
} from "../constants";

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  order: any;
}

export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TOrderDetailsActions =
  | ISendOrderRequestAction
  | ISendOrderSuccessAction
  | ISendOrderFailedAction
  | ICloseModalAction;

export const setOrderRequest = (): ISendOrderRequestAction => ({
  type: SEND_ORDER_REQUEST,
});

export const setOrderSuccess = (res: any): ISendOrderSuccessAction => ({
  type: SEND_ORDER_SUCCESS,
  order: res.order,
});

export const setOrderFailed = (): ISendOrderFailedAction => ({
  type: SEND_ORDER_FAILED,
});

export const sendOrder = (items: TIngredient[]) => (dispatch: AppDispatch) => {
  dispatch(setOrderRequest());
  sendOrderRequest(items)
    .then((res) => dispatch(setOrderSuccess(res)))
    .catch(() => dispatch(setOrderFailed()));
};
