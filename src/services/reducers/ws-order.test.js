import { wsOrdersReducer } from './ws-order';
import { initialState } from './ws-order';
import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from '../constants/constants';

describe("wsOrdersReducer", () => {
  it("should return the initial state", () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_ORDERS_CONNECTION_SUCCESS", () => {
    expect(
      wsOrdersReducer(initialState, {
        type: WS_ORDERS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle WS_ORDERS_CONNECTION_ERROR", () => {
    expect(
      wsOrdersReducer(initialState, {
        type: WS_ORDERS_CONNECTION_ERROR,
        payload: { message: "connection is closed" },
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: { message: "connection is closed" },
    });
  });

  it("should handle WS_FEED_CONNECTION_CLOSED", () => {
    expect(
      wsOrdersReducer(initialState, {
        type: WS_ORDERS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle WS_FEED_GET_MESSAGE", () => {
    expect(
      wsOrdersReducer(initialState, {
        type: WS_ORDERS_GET_MESSAGE,
        payload: {
          orders: [{id: 1}, {id: 2}],
          total: 7600,
          totalToday: 25,
        }
      })
    ).toEqual({
      ...initialState,
        orders: [{id: 1}, {id: 2}],
        total: 7600,
        totalToday: 25,
        error: null,
    });
  });
});
