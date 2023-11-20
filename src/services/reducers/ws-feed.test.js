import { wsFeedReducer } from "./ws-feed";
import { initialState } from "./ws-feed";
import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
} from "../constants/constants";

describe("wsFeedReducer", () => {
  it("should return the initial state", () => {
    expect(wsFeedReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_FEED_CONNECTION_SUCCESS", () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle WS_FEED_CONNECTION_ERROR", () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_ERROR,
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
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle WS_FEED_GET_MESSAGE", () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_GET_MESSAGE,
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
