import { wsFeedReducer } from "./ws-feed";
import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
} from "../constants";

const state = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

describe("wsFeedReducer", () => {
  it("should return the initial state", () => {
    expect(wsFeedReducer(undefined, {})).toEqual(state);
  });

  it("should handle WS_FEED_CONNECTION_SUCCESS", () => {
    expect(
      wsFeedReducer(state, {
        type: WS_FEED_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...state,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle WS_FEED_CONNECTION_ERROR", () => {
    expect(
      wsFeedReducer(state, {
        type: WS_FEED_CONNECTION_ERROR,
        payload: { message: "connection is closed" },
      })
    ).toEqual({
      ...state,
      wsConnected: false,
      error: { message: "connection is closed" },
    });
  });

  it("should handle WS_FEED_CONNECTION_CLOSED", () => {
    expect(
      wsFeedReducer(state, {
        type: WS_FEED_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...state,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle WS_FEED_GET_MESSAGE", () => {
    expect(
      wsFeedReducer(state, {
        type: WS_FEED_GET_MESSAGE,
        payload: {
          orders: [{id: 1}, {id: 2}],
          total: 7600,
          totalToday: 25,
        }
      })
    ).toEqual({
      ...state,
        orders: [{id: 1}, {id: 2}],
        total: 7600,
        totalToday: 25,
        error: null,
    });
  });
});
