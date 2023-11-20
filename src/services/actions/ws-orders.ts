import { TFeedResponse } from '../../types/types';
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from '../constants/constants';

export interface IWsOrdersConnectionStart {
  readonly type: typeof WS_ORDERS_CONNECTION_START
};

export interface IWsOrdersConnectionSuccess {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS
};

export interface IWsOrdersConnectionError {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR,
  readonly payload: MessageEvent
};

export interface IWsOrdersConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED
};

export interface IWsOrdersGetMessage {
  readonly type: typeof WS_ORDERS_GET_MESSAGE,
  readonly payload: TFeedResponse
};

export type TOrdersActions =
  | IWsOrdersConnectionStart
  | IWsOrdersConnectionSuccess
  | IWsOrdersConnectionError
  | IWsOrdersConnectionClosed
  | IWsOrdersGetMessage

export const wsOrdersConnectionStart = (): IWsOrdersConnectionStart => {
	return { type: WS_ORDERS_CONNECTION_START }
};

export const wsOrdersConnectionSuccess = (): IWsOrdersConnectionSuccess => {
	return { type: WS_ORDERS_CONNECTION_SUCCESS }
};

export const wsOrdersConnectionError = (message: MessageEvent): IWsOrdersConnectionError => {
	return {
    type: WS_ORDERS_CONNECTION_ERROR,
    payload: message
  }
};

export const wsOrdersConnectionClosed = (): IWsOrdersConnectionClosed => {
	return { type: WS_ORDERS_CONNECTION_CLOSED }
};

export const wsOrdersGetMessage = (orders: TFeedResponse): IWsOrdersGetMessage => {
	return {
    type: WS_ORDERS_GET_MESSAGE,
    payload: orders
  }
};
