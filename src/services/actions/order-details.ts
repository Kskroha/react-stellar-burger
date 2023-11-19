import { getOrderRequest, sendOrderRequest } from "../api";
import { AppDispatch } from "../../types";
import { TIngredient, TOrder } from "../../types/types";
import {
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  CLOSE_MODAL,
  GET_CURRENT_ORDER_FAILED,
  GET_CURRENT_ORDER_REQUEST,
  GET_CURRENT_ORDER_SUCCESS,
} from "../constants/constants";

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  order: TOrder;
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
  | ICloseModalAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction

export const setOrderRequest = (): ISendOrderRequestAction => ({
  type: SEND_ORDER_REQUEST,
});

export const setOrderSuccess = (res: {order: TOrder}): ISendOrderSuccessAction => ({
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

export interface IGetOrderRequestAction {
  readonly type: typeof GET_CURRENT_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_CURRENT_ORDER_SUCCESS;
  orders: Array<TOrder>;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_CURRENT_ORDER_FAILED;
}

export const setGetOrderRequest = (): IGetOrderRequestAction => ({
  type: GET_CURRENT_ORDER_REQUEST,
});

export const setGetOrderSuccess = (res: {orders: TOrder[]}): IGetOrderSuccessAction => ({
  type: GET_CURRENT_ORDER_SUCCESS,
  orders: res.orders,
});

export const setGetOrderFailed = (): IGetOrderFailedAction => ({
  type: GET_CURRENT_ORDER_FAILED,
});

export const getOrder = (orderNumber: string) => (dispatch: AppDispatch) => {
  dispatch(setGetOrderRequest());
  getOrderRequest(orderNumber)
    .then((res) => dispatch(setGetOrderSuccess(res)))
    .catch(() => dispatch(setGetOrderFailed()));
};
