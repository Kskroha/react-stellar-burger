import { TFeedResponse } from '../../types/types';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE
} from '../constants';

export interface IWsFeedConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START
};

export interface IWsFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS
};

export interface IWsFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR,
  readonly payload: MessageEvent
};

export interface IWsFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED
};

export interface IWsFeedGetMessage {
  readonly type: typeof WS_FEED_GET_MESSAGE,
  readonly payload: TFeedResponse
};

export type TFeedActions =
  | IWsFeedConnectionStart
  | IWsFeedConnectionSuccess
  | IWsFeedConnectionError
  | IWsFeedConnectionClosed
  | IWsFeedGetMessage

export const wsFeedConnectionStart = (): IWsFeedConnectionStart => {
	return { type: WS_FEED_CONNECTION_START }
};

export const wsFeedConnectionSuccess = (): IWsFeedConnectionSuccess => {
	return { type: WS_FEED_CONNECTION_SUCCESS }
};

export const wsFeedConnectionError = (message: MessageEvent): IWsFeedConnectionError => {
	return {
    type: WS_FEED_CONNECTION_ERROR,
    payload: message
  }
};

export const wsFeedConnectionClosed = (): IWsFeedConnectionClosed => {
	return { type: WS_FEED_CONNECTION_CLOSED }
};

export const wsFeedGetMessage = (orders: TFeedResponse): IWsFeedGetMessage => {
	return {
    type: WS_FEED_GET_MESSAGE,
    payload: orders
  }
};
